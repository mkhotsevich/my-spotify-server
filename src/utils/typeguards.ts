export const isHttpError = (error: unknown): error is { message: string } => {
  if (error && typeof error === 'object' && 'message' in error) {
    return true
  }

  return false
}