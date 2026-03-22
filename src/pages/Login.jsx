import { FcGoogle } from 'react-icons/fc';
import { ImGithub } from 'react-icons/im';

const Login = () => {
  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const loginWithGithub = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/github';
  };

  return (
    <div className="min-h-screen flex items-center justify-content bg-[#0f0f0f]">
      <div className="w-full max-w-md mx-auto px-10 py-12 bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] flex flex-col items-center gap-6">

        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-13 h-13 rounded-xl bg-red-600 flex items-center justify-center text-white text-xl font-bold">
            A
          </div>
          <h1 className="text-white text-2xl font-semibold mt-2">Welcome back</h1>
          <p className="text-gray-500 text-sm">Sign in to continue to App</p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#2a2a2a]" />

        {/* Buttons */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-[#242424] border border-[#2a2a2a] text-white text-sm font-medium hover:bg-[#2e2e2e] transition-colors cursor-pointer"
          >
            <FcGoogle className="text-lg" />
            Continue with Google
          </button>

          <button
            onClick={loginWithGithub}
            className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl bg-[#242424] border border-[#2a2a2a] text-white text-sm font-medium hover:bg-[#2e2e2e] transition-colors cursor-pointer"
          >
            <ImGithub className="text-lg text-white" />
            Continue with GitHub
          </button>
        </div>

        {/* Footer */}
        <p className="text-gray-600 text-xs text-center">
          By continuing, you agree to our{' '}
          <span className="text-gray-400 underline cursor-pointer hover:text-white transition-colors">Terms</span>
          {' '}and{' '}
          <span className="text-gray-400 underline cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
        </p>

      </div>
    </div>
  );
};

export default Login;