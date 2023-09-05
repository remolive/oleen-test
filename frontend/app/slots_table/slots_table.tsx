'use client';

import * as React from 'react'

import { tableData, weekDays, RowSlots, tableHeaderData } from './table_data'

import {
  flexRender,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const slotComp = (time?: Date) => {
  const hour = ("0" + time?.getHours()).slice(-2)
  const minutes = ("0" + time?.getMinutes()).slice(-2)

  return (
    <div className="flex align-middle justify-center bg-green-100 hover:bg-green-200 px-4 py-2 rounded-md mx-3">
      {hour}:{minutes}
    </div>
  )
}

const noSlotComp = () => {
  return (
    <div className="flex align-middle justify-center text-2xl text-neutral-200 px-4 py-2 rounded-md mx-3">
      --
    </div>
  )
}

const headerLabel = (day: string, date: Date) => {
  const dayName = day.slice(0, 3)
  const dayNumber = ("0" + date.getDate()).slice(-2)
  const monthNumber = ("0" + date.getMonth()).slice(-2)

  return (
    <div className="text-center">
      {dayName}. <br></br>{dayNumber}/{monthNumber}
    </div>
  )
}

const startTime = new Date(`2021-03-01 08:00:00`);
const endTime = new Date(`2021-03-01 18:00:00`);
const columnHelper = createColumnHelper<RowSlots>()
const headerData = tableHeaderData(startTime, endTime)
let bodyData = tableData(startTime, endTime)

const dayColumns = () => {
  return weekDays.map((day, index) => {
    return columnHelper.accessor(row => row[day as keyof RowSlots], {
      header: () => headerLabel(day, headerData[index]), 
      cell: info => info.getValue() ? slotComp(info.getValue()) : noSlotComp(),
      id: day
    })
  })
}

export default function SlotsTable() {
  const [data, setData] = React.useState(() => [...bodyData])
  const displayFullDay = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns: dayColumns(),
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="mt-4">
      <table className="border border-solid border-neutral-200 rounded-lg overflow-hidden w-full">
        <thead className="bg-neutral-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='border-x-0 py-2'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="py-4">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border-r border-solid border-neutral-200">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />

      <button onClick={() => displayFullDay()} className="border border-blue-600 text-blue-600 hover:bg-blue-100 rounded-lg px-4 py-2">
        Afficher plus de créneaux
      </button>
    </div>
  )
}
