import OrderCard from '@/components/order/OrderCard'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import { revalidatePath } from 'next/cache'
import React from 'react'


async function getPendingOrders() {
  const orders = await prisma.order.findMany({
    where: {
      status: false
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })
  return orders
}

export default async function Orders() {

  const orders = await getPendingOrders()


  return (
    <>
      <Heading> Administrar Ordenes </Heading>

      <form 
        action={ async () => {
          "use server"

          revalidatePath('/admin/orders')
        }}
      >
        <input 
          type='submit'
          className='bg-amber-400 w-full lg:w-auto text-lg px-10 py-3 text-center font-bold cursor-pointer'
          value='Actualizar Ordenes'
        />

      </form>

      {orders.length ? (
        <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5'>
          {orders.map(order => (
            <OrderCard key={order.id} order={order}/>
          ))}
        </div>
      ): <p className='text-center'> No hay ordenes Pendientes</p>}
    </>
  )
}
/* 
"use client"
import OrderCard from '@/components/order/OrderCard'
import Heading from '@/components/ui/Heading'
import { OrderWithProducts } from '@/src/types'
import React from 'react'
import useSWR from 'swr'




export default  function Orders() {

    const url = '/admin/orders/api'
    const fetcher = () => fetch(url).then(res => res.json())
    
    const {data , error, isLoading}  = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 60000,
        revalidateOnFocus:false
    })

    if(isLoading) return 'Cargando'

    if(data)return (
        <>
            <Heading> Administrar Ordenes </Heading>


            {data.length ? (
                <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5'>
                    {data.map(order => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            ) : <p className='text-center'> No hay ordenes Pendientes</p>}
        </>
    )
}

*/
