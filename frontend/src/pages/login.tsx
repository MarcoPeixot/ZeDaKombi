import { LoginForm } from "../components/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-500 to-blue-700 px-4">
      <div className="max-w-md w-full space-y-6">
        <LoginForm />
      </div>
    </div>
  )
}
