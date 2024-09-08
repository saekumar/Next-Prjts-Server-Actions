import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GetAllProds() {
  try {
    let res = await axios.get('https://fakestoreapi.com/products')

    if (Array.isArray(res.data)) {
      return res.data
    } else {
      return NextResponse.json({ message: 'Expected an array of products' })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Something went wrong' })
  }
}
