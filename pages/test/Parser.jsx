import React, { useEffect, useState } from "react";
import XLSX from 'xlsx';

const Parser = () => {
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState(null)

  const load = async () => {
    const file = await fetch("file.xlsm")
    const sheets = await file.arrayBuffer()
    const opt = {
      cellStyles: true
    }
    const workBook = XLSX.read(sheets, opt)
    setData(workBook)
    setLoaded(true)
    console.log(data)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line
  }, [])
  
  /* couleur du fill des cells shifts = #00FF00 */

  if (!loaded) {
    return (
      <p>Loading…</p>
    )
  }
  return (
    <p> data is ready </p>
  )
}

export default Parser