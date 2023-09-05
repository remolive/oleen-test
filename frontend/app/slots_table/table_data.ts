
export const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
export const slotDuration = 30 // minutes

export type RowSlots = {
  monday?: Date
  tuesday?: Date
  wednesday?: Date
  thursday?: Date
  friday?: Date
  saturday?: Date
  sunday?: Date
}

const getRowForTime = (time: Date): RowSlots => {
  // e.g time = 2021-03-01 08:00:00 +0100
  const date = new Date(time)
  const row = {} as RowSlots

  weekDays.forEach((day, index) => {
    date.setDate(time.getDate() + index)
    row[day as keyof RowSlots] = data[index].includes(date.getTime()) ? date : undefined
  })

  return row;
}

export const tableData = (startTime: Date, endTime: Date): RowSlots[] => {
  const rows: RowSlots[] = []

  while (startTime < endTime) {
    rows.push(getRowForTime(startTime))
    startTime.setMinutes(startTime.getMinutes() + slotDuration);
  }

  return rows
}

export const tableHeaderData = (startTime: Date, endTime: Date): Date[] => {
  const headerRows: Date[] = []

  weekDays.forEach((_day, index) => {
    const date = new Date(startTime)
    date.setDate(startTime.getDate() + index)
    headerRows.push(date)
  })

  return headerRows
}

const parseRawData = (): number[][] => {
  return rawData.map((daySlots) => daySlots.map((slot) => new Date(slot).getTime()))
}

const rawData = [
  [],
  [
    '2021-03-02 08:30:00 +0100',
    '2021-03-02 09:00:00 +0100',
    '2021-03-02 10:30:00 +0100',
    '2021-03-02 11:00:00 +0100',
    '2021-03-02 11:30:00 +0100',
    '2021-03-02 12:00:00 +0100',
    '2021-03-02 12:30:00 +0100',
    '2021-03-02 14:00:00 +0100',
    '2021-03-02 14:30:00 +0100',
    '2021-03-02 15:00:00 +0100',
    '2021-03-02 15:30:00 +0100',
    '2021-03-02 16:00:00 +0100',
    '2021-03-02 16:30:00 +0100',
    '2021-03-02 17:00:00 +0100',
    '2021-03-02 17:30:00 +0100'
  ],
  [],
  [],
  [],
  [
    '2021-03-06 08:00:00 +0100',
    '2021-03-06 09:30:00 +0100',
    '2021-03-06 10:00:00 +0100',
    '2021-03-06 10:30:00 +0100',
    '2021-03-06 11:00:00 +0100',
    '2021-03-06 11:30:00 +0100',
    '2021-03-06 12:00:00 +0100',
    '2021-03-06 12:30:00 +0100',
    '2021-03-06 13:00:00 +0100',
    '2021-03-06 13:30:00 +0100',
    '2021-03-06 14:00:00 +0100',
    '2021-03-06 15:15:00 +0100'
  ],
  []
]

const data = parseRawData()