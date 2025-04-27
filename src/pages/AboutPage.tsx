import { MapPin, User, Calendar, Clock, Coffee, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/5137664/pexels-photo-5137664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About WanderRest Hostel
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Where comfort meets adventure in the heart of the city
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                WanderRest Hostel was founded in 2015 by a group of passionate travelers who wanted to create 
                the perfect space for fellow adventurers. What started as a small 10-bed hostel has grown into 
                a vibrant community hub for travelers from all around the world.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Our mission is to provide affordable, comfortable, and social accommodation for travelers 
                who value experiences and connections. We believe that travel should be accessible to everyone, 
                and that the best memories often come from the people you meet along the way.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Today, WanderRest welcomes thousands of guests each year. We've expanded our facilities while 
                maintaining the warm, community atmosphere that makes hostel life special.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="h-64 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Common room at WanderRest Hostel" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 rounded-lg overflow-hidden mt-8">
                <img 
                  src="https://images.pexels.com/photos/2029719/pexels-photo-2029719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Dorm room at WanderRest Hostel" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3771111/pexels-photo-3771111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Kitchen at WanderRest Hostel" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 rounded-lg overflow-hidden mt-8">
                <img 
                  src="https://images.pexels.com/photos/2549573/pexels-photo-2549573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Outdoor patio at WanderRest Hostel" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Our Location</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Perfectly situated in the heart of the city, with easy access to major attractions and transportation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden h-96">
              {/* In a real application, this would be an interactive map */}
              <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
                <MapPin className="text-teal-600 dark:text-teal-400" size={48} />
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Central & Convenient</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Our hostel is located in the vibrant downtown district, just steps away from restaurants, 
                cafes, shops, and public transportation. We're a 5-minute walk from the central train station 
                and a 20-minute drive from the international airport.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-teal-600 dark:text-teal-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">Address</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      123 Adventure Road, Traveler's District<br />
                      World City, 10001
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mr-4">
                      <span className="text-teal-600 dark:text-teal-400 font-semibold">5</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Minutes to Central Station
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mr-4">
                      <span className="text-teal-600 dark:text-teal-400 font-semibold">10</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Minutes to Main Shopping District
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mr-4">
                      <span className="text-teal-600 dark:text-teal-400 font-semibold">15</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Minutes to Historic District
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mr-4">
                      <span className="text-teal-600 dark:text-teal-400 font-semibold">20</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Minutes to Airport
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values & Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">What Makes Us Different</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're not just a place to sleep – we're a community of travelers and a gateway to local experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-teal-100 dark:bg-teal-900 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <User className="text-teal-600 dark:text-teal-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Community Focus</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We foster a welcoming environment where travelers can connect, share stories, and make lasting friendships.
                Our common areas are designed to encourage interaction and cultural exchange.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-teal-100 dark:bg-teal-900 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Calendar className="text-teal-600 dark:text-teal-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Local Experiences</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our staff organizes regular events, from city tours to cooking classes, helping you experience 
                the city like a local. We partner with local businesses to offer authentic experiences.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-teal-100 dark:bg-teal-900 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Coffee className="text-teal-600 dark:text-teal-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Home Comforts</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We believe budget travel doesn't mean sacrificing comfort. Enjoy quality beds, clean facilities, 
                well-equipped kitchens, and cozy common areas that feel like a home away from home.
              </p>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Sustainability Commitment</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                At WanderRest, we're committed to sustainable practices that minimize our environmental 
                footprint while maximizing positive social impact. We believe responsible travel is better travel.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-teal-100 dark:bg-teal-900 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <Award className="text-teal-600 dark:text-teal-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">Green Certified</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      We're proud to hold Green Hostel certification for our eco-friendly practices.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-teal-100 dark:bg-teal-900 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <Award className="text-teal-600 dark:text-teal-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">Local Partnerships</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      We source products locally and partner with community organizations.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-teal-100 dark:bg-teal-900 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <Award className="text-teal-600 dark:text-teal-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">Waste Reduction</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our comprehensive recycling program and waste reduction initiatives minimize our impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Community gathering at WanderRest Hostel" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about staying at WanderRest Hostel
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">What are check-in and check-out times?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Check-in is available from 2:00 PM until 10:00 PM. If you need to arrive outside these hours, 
                please contact us in advance. Check-out is at 11:00 AM. Late check-out may be available upon request.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Is there an age restriction?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, guests must be at least 18 years old to stay in our shared dormitories. Families with children 
                are welcome to book our private rooms.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Do you have lockers available?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, all dormitory rooms have secure lockers available for each guest. Please bring your own padlock 
                or purchase one at reception.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Is breakfast included?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We offer a complimentary light breakfast for all guests, served from 7:30 AM to 10:00 AM daily. 
                This includes coffee, tea, juice, cereal, bread, and spreads.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">What's your cancellation policy?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Free cancellation is available up to 48 hours before your scheduled arrival. Cancellations made within 
                48 hours of arrival are subject to a one-night charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience WanderRest?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of travelers and make your next trip unforgettable
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="/rooms"
              className="bg-white text-teal-600 font-medium px-8 py-3 rounded-md transition-colors hover:bg-gray-100 inline-block"
            >
              Browse Rooms
            </a>
            <a
              href="/booking"
              className="bg-transparent border-2 border-white text-white font-medium px-8 py-3 rounded-md transition-colors hover:bg-white/10 inline-block"
            >
              Book Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;