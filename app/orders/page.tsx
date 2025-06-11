import LatestOrderItem from "@/components/order/LatestOrderItem";
import Logo from "@/components/ui/Logo";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";


async function getPendingOrders() {
    const orders = await prisma.order.findMany({
        take: 5,
        where: {
            orderReadyAt: {
                not: null
            }
        },
        orderBy: {
            orderReadyAt: 'desc'
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


export default async function OrdersPage() {
    const orders = await getPendingOrders()
    return (
        <>
            <h1 className="text-center mt-20 text-6xl font-black"></h1>

            <Logo />

            <div className="text-center  flex justify-start ml-9 ">
                <form
                    action={async () => {
                        "use server"

                        revalidatePath('/orders')
                    }}
                >
                    <input
                        type='submit'
                        className='bg-amber-400 w-full lg:w-auto text-lg px-10 py-3 text-center font-bold cursor-pointer lg:m-auto'
                        value='Actualizar Ordenes Listas'
                    />

                </form>
            </div>

            {orders.length ? (
                <div className="grid grid-cols-1 gap-5 max-w-5xl mx-auto mt-10">
                    {orders.map(order => (
                        <LatestOrderItem 
                            key={order.id}
                            order={order}
                        />
                    ))}
                </div>
            ) : <p className="text-center my-10"> No hay ordenes listas</p>}


        </>
    )
}
