import { randomBytes } from 'crypto'

export function generateToken() {
  return randomBytes(24).toString('hex')
}
