import { AppExtensionContext, CommandContext } from 'bike/app'
import { getYearRow } from './calendar-rows'
import { parseYear } from './parse-year'
import { calendarDefaults } from '../dom/protocols'

export async function activate(context: AppExtensionContext) {
  // Register the same defaults as the core Calendar so the copied
  // calendar-rows.ts resolves matching date formats and level flags,
  // but override the day format to "Sun 31 May".
  bike.defaults.registerDefaults({
    ...calendarDefaults,
    dayNameFormat: '{"weekday":"short","month":"short","day":"numeric"}',
  })

  bike.commands.addCommands({
    commands: {
      'calendar:year-for': yearForCommand,
    },
  })
}

async function yearForCommand(context: CommandContext): Promise<boolean> {
  const editor = context.editor
  if (!editor) return false

  let message = 'Enter year (e.g. 2027)'
  let previous = ''

  // Loop until the user enters a valid year or cancels.
  while (true) {
    const result = await bike.showAlert({
      title: 'Calendar for Year',
      message,
      buttons: ['Create', 'Cancel'],
      fields: [
        {
          id: 'year',
          type: 'text',
          placeholder: '2027',
          defaultValue: previous,
        },
      ],
    })

    if (result.button !== 'Create') return false

    const raw = String(result.values['year'] ?? '')
    const year = parseYear(raw)
    if (year === null) {
      previous = raw.trim()
      message = 'Please enter a 4-digit year (e.g. 2027)'
      continue
    }

    const yearRow = getYearRow(editor.outline, new Date(year, 0, 1))
    editor.focus = yearRow
    editor.selectCaret(yearRow.firstChild ?? yearRow, 0)
    return true
  }
}
