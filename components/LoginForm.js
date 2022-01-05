import Image from 'next/image'

const LoginForm = ({ errorMessage, onSubmit }) => (
  <div className="w-full lg:w-1/2 px-10">
    <div className="px-6 lg:px-20 pt-12 lg:pt-20 bg-dark text-light shadow-2xl rounded-lg">
      <form onSubmit={onSubmit}>
        <h3 className="mb-10 text-2xl font-bold font-heading">
          Passwordless Access
        </h3>
        <div className="flex items-center pl-6 mb-3 border border-gray-50 bg-white rounded-full">
          <span className="inline-block pr-3 border-r border-gray-50">
            <svg
              className="w-5 h-5"
              width="20"
              height="21"
              viewbox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.29593 0.492188C4.81333 0.492188 2.80078 2.50474 2.80078 4.98734C2.80078 7.46993 4.81333 9.48248 7.29593 9.48248C9.77851 9.48248 11.7911 7.46993 11.7911 4.98734C11.7911 2.50474 9.77851 0.492188 7.29593 0.492188ZM3.69981 4.98734C3.69981 3.00125 5.30985 1.39122 7.29593 1.39122C9.28198 1.39122 10.892 3.00125 10.892 4.98734C10.892 6.97342 9.28198 8.58346 7.29593 8.58346C5.30985 8.58346 3.69981 6.97342 3.69981 4.98734Z"
                fill="black"
              ></path>
              <path
                d="M5.3126 10.3816C2.38448 10.3816 0.103516 13.0524 0.103516 16.2253V19.8214C0.103516 20.0696 0.304772 20.2709 0.55303 20.2709H14.0385C14.2867 20.2709 14.488 20.0696 14.488 19.8214C14.488 19.5732 14.2867 19.3719 14.0385 19.3719H1.00255V16.2253C1.00255 13.4399 2.98344 11.2806 5.3126 11.2806H9.27892C10.5443 11.2806 11.6956 11.9083 12.4939 12.9335C12.6465 13.1293 12.9289 13.1644 13.1248 13.0119C13.3207 12.8594 13.3558 12.5769 13.2033 12.381C12.2573 11.1664 10.8566 10.3816 9.27892 10.3816H5.3126Z"
                fill="black"
              ></path>
              <rect
                x="15"
                y="15"
                width="5"
                height="1"
                rx="0.5"
                fill="black"
              ></rect>
              <rect
                x="17"
                y="18"
                width="5"
                height="1"
                rx="0.5"
                transform="rotate(-90 17 18)"
                fill="black"
              ></rect>
            </svg>
          </span>
          <input
            className="w-full pr-6 pl-4 py-4 font-bold placeholder-accent-light text-dark rounded-r-full focus:outline-none"
            type="email"
            placeholder="joe.bloggs@example.com"
            id="email"
          />
        </div>
        <div className="my-5">
          <button
            type="submit"
            className="inline-block w-full py-2 px-4 text-light font-bold bg-primary hover:bg-accent-light hover:text-dark rounded-full transition duration-200"
          >
            Log In / Sign Up
          </button>
        </div>
      </form>
      {errorMessage && <p className="text-sm text-danger">{errorMessage}</p>}
      <div className="pt-10 pb-5 flex items-center space-x-10">
        <div>Secured by</div>
        <Image
          className="pl-2"
          src="/Magic_Horizontal_White.svg"
          height="50px"
          width="100px"
        />
      </div>
    </div>
  </div>
)

export default LoginForm
