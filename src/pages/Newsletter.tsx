interface Iprops {}
const Newsletter = ({}: Iprops) => {
  return (
    <div className=" bg-white">
      {/* Newsletter */}
      <section className="bg-[#6f9a37] py-8 md:py-10">      
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-xl md:text-2xl font-medium mb-1 md:mb-2">
              Subscribe For The Newsletter
            </h2>
            <p className="text-sm md:text-base text-gray-100 mb-4 md:mb-6">
              Words To Get Latest Update (Sign Up For Free)
            </p>
            <form className="max-w-xs mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-3 py-1.5 md:px-4 md:py-2 rounded-sm text-sm text-gray-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-white text-[#6f9a37] px-4 py-1.5 md:px-5 md:py-2 rounded-sm text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
