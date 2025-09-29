import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
    return (
        <main className="
            mx-auto max-w-md bg-black bg-opacity-0
            lg:p-4 lg:mt-28 lg:w-[90%]
            md:p-4 md:mt-20 md:w-[90%]
            mt-16 w-[95%] mb-32
            flex items-center justify-center min-h-[60vh]
        ">
            <LoginForm />
        </main>
    );
}
