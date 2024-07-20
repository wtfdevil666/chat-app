import express, { Request, Response } from "express"
import { db } from "../utils/db"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { loginSchema, registerSchema } from "../utils/schema"

export const router = express()
const JWT_SECRET = process.env.JWT_SECRET as string

router.post("/register", async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const validate = registerSchema.safeParse({
        name, email, password
    })
    if (!validate.success) {
        return res.status(404).json({
            error: "Invalid Inputs"
        })
    }

    const existingUser = await db.user.findUnique({
        where: {
            email: email
        }
    })
    if (existingUser) {
        return res.status(409).json({
            error: "User Already exists"
        })
    }

    const hashed = await bcryptjs.hash(password, 10)

    const user = await db.user.create({
        data: {
            name: name,
            email: email,
            password: hashed
        }
    })

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" })

    return res.status(200).json({
        user: user,
        token: token
    })
})

router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body

    const validate = loginSchema.safeParse({
        email, password
    })

    if (!validate.success) {
        return res.status(404).json({
            error: "Invalid Inputs"
        })
    }

    const user = await db.user.findUnique({
        where: {
            email: email,

        },
    })
    if (!user) {
        return res.status(404).json({
            error: "User not found"
        })
    }

    const isMatch = bcryptjs.compare(password, user?.password)
    if (!isMatch) {
        res.status(401).json({
            error: "Invalid Credentials"
        })
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' })

    return res.status(200).json({
        user: user,
        token: token
    })
})