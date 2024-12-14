import Login from "@/Login";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-[#2A2640] to-[#1E1B2F]  text-gray-300">
      <div className="max-w-4xl w-full p-8 md:p-12 shadow-lg bg-gray-800 bg-opacity-60 rounded-xl backdrop-blur-lg text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Welcome to Samay Capsule!
        </h1>
        <p className="text-lg md:text-xl font-medium">
          Hey there, future explorer! You’ve stumbled upon a place where time
          travels almost as fast as you can hit "send."
        </p>
        <p className="text-lg md:text-xl">
          Ever wanted to send a message to your future self? Or leave a note to
          your future grandkids, telling them how cool you were in 2024? Well,
          you’re in the right spot. Samay Capsule lets you create, store, and
          open memories when the time is just right—whether that’s in 1 year or
          50.
        </p>
        <p className="text-lg md:text-xl font-medium">
          So, what's the catch? Well, you gotta sign in first! Just a little
          formality to make sure your capsule is yours and not some random
          stranger’s. Click below, sign in, and let’s get you started on your
          time-bending journey!
        </p>
        <p className="text-lg md:text-xl font-bold text-[#507ca9]">
          What are you waiting for? Your future self is probably already
          wondering what the heck you're up to. Go ahead and sign in!
        </p>
      </div>
      <div className="mt-8">
        <Login />
      </div>
    </div>
  );
};

export default Home;
