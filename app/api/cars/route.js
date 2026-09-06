import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const cars = await prisma.car.findMany()
    return NextResponse.json(cars)
}

export async function POST(request){
    const body = await request.json()
    const car = await prisma.car.create({
        data: {
            car_name: body.car_name,
            car_platNum: body.car_platNum,
            car_year: body.car_year,
            car_type: body.car_type
        }
    })
    return NextResponse.json(car, {status: 201})

}