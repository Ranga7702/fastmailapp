import React, { useState, useEffect } from 'react';
import { Package, MapPin, Clock, DollarSign, Truck, User, Phone, Mail, Calculator, Star, Navigation, CheckCircle, AlertCircle } from 'lucide-react';

const PackageDeliveryApp = () => {
  const [userType, setUserType] = useState('customer'); // 'customer' or 'partner'
  const [currentView, setCurrentView] = useState('home'); // 'home', 'booking', 'tracking', 'partner-dashboard'
  const [bookingData, setBookingData] = useState({
    fromCity: '',
    toCity: '',
    packageType: 'document',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    pickupAddress: '',
    deliveryAddress: '',
    senderDetails: { name: '', phone: '', email: '' },
    receiverDetails: { name: '', phone: '', email: '' },
    urgency: 'standard',
    fragile: false,
    estimatedPrice: 0
  });
  const [activeOrders, setActiveOrders] = useState([]);
  const [partnerData, setPartnerData] = useState({
    name: 'John Driver',
    rating: 4.8,
    completedDeliveries: 247,
    vehicleType: 'Car',
    availableRoutes: ['New York - Boston', 'Boston - Philadelphia', 'New York - Washington DC']
  });

  // Mock data for cities and pricing
  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
    'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte',
    'Seattle', 'Denver', 'Washington DC', 'Boston', 'Nashville'
  ];

  const packageTypes = [
    { id: 'document', name: 'Documents', basePrice: 15, icon: '📄' },
    { id: 'small', name: 'Small Package', basePrice: 25, icon: '📦' },
    { id: 'medium', name: 'Medium Package', basePrice: 45, icon: '📫' },
    { id: 'large', name: 'Large Package', basePrice: 75, icon: '📮' },
    { id: 'fragile', name: 'Fragile Items', basePrice: 85, icon: '🔔' }
  ];

  const urgencyOptions = [
    { id: 'standard', name: 'Standard (24 hrs)', multiplier: 1 },
    { id: 'express', name: 'Express (12 hrs)', multiplier: 1.5 },
    { id: 'urgent', name: 'Urgent (6 hrs)', multiplier: 2.2 }
  ];

  // Mock orders for demonstration
  const mockOrders = [
    {
      id: 'ORD-001',
      from: 'New York',
      to: 'Boston',
      status: 'in_transit',
      pickupTime: '2025-06-05T10:30:00',
      estimatedDelivery: '2025-06-06T08:00:00',
      partner: 'John Driver',
      price: 45,
      trackingUpdates: [
        { time: '10:30', status: 'Package picked up from New York' },
        { time: '14:20', status: 'Package in transit - Hartford, CT' },
        { time: '16:45', status: 'Package arrived at Boston sorting facility' }
      ]
    }
  ];

  // Calculate estimated price
  const calculatePrice = () => {
    if (!bookingData.fromCity || !bookingData.toCity || !bookingData.packageType) return 0;
    
    const basePrice = packageTypes.find(p => p.id === bookingData.packageType)?.basePrice || 0;
    const urgencyMultiplier = urgencyOptions.find(u => u.id === bookingData.urgency)?.multiplier || 1;
    const distanceMultiplier = bookingData.fromCity === bookingData.toCity ? 0.5 : 1;
    const fragileMultiplier = bookingData.fragile ? 1.3 : 1;
    
    const estimatedPrice = basePrice * urgencyMultiplier * distanceMultiplier * fragileMultiplier;
    setBookingData(prev => ({ ...prev, estimatedPrice: Math.round(estimatedPrice) }));
  };

  useEffect(() => {
    calculatePrice();
  }, [bookingData.fromCity, bookingData.toCity, bookingData.packageType, bookingData.urgency, bookingData.fragile]);

  const handleBooking = () => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      ...bookingData,
      status: 'confirmed',
      bookingTime: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
    setActiveOrders([...activeOrders, newOrder]);
    setCurrentView('tracking');
  };

  if (userType === 'partner') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Partner Header */}
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Partner Dashboard</h1>
              <p className="text-blue-100">Welcome back, {partnerData.name}</p>
            </div>
            <button 
              onClick={() => setUserType('customer')}
              className="bg-blue-500 px-4 py-2 rounded-lg"
            >
              Customer View
            </button>
          </div>
        </div>

        {/* Partner Stats */}
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{partnerData.rating}</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{partnerData.completedDeliveries}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <Truck className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{partnerData.vehicleType}</div>
              <div className="text-sm text-gray-600">Vehicle</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">$2,340</div>
              <div className="text-sm text-gray-600">This Month</div>
            </div>
          </div>

          {/* Available Routes */}
          <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
            <h3 className="text-lg font-bold mb-4">Your Available Routes</h3>
            <div className="space-y-3">
              {partnerData.availableRoutes.map((route, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Navigation className="w-5 h-5 text-blue-500 mr-3" />
                    <span className="font-medium">{route}</span>
                  </div>
                  <div className="text-green-600 font-bold">$45-85</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Recent Delivery Requests</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-bold">New York → Boston</div>
                    <div className="text-sm text-gray-600">Medium Package • Express Delivery</div>
                    <div className="text-sm text-gray-600">Pickup: 123 Broadway, NYC</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-bold text-lg">$68</div>
                    <div className="text-sm text-gray-600">6 hours</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex-1">
                    Accept
                  </button>
                  <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex-1">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'booking') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-purple-600 text-white p-4">
          <button 
            onClick={() => setCurrentView('home')}
            className="text-purple-200 mb-2"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">Book Delivery</h1>
        </div>

        <div className="p-4 space-y-6">
          {/* Route Selection */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Select Route</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">From City</label>
                <select 
                  className="w-full p-3 border rounded-lg"
                  value={bookingData.fromCity}
                  onChange={(e) => setBookingData(prev => ({ ...prev, fromCity: e.target.value }))}
                >
                  <option value="">Select city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">To City</label>
                <select 
                  className="w-full p-3 border rounded-lg"
                  value={bookingData.toCity}
                  onChange={(e) => setBookingData(prev => ({ ...prev, toCity: e.target.value }))}
                >
                  <option value="">Select city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Package Details</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Package Type</label>
              <div className="grid grid-cols-2 gap-2">
                {packageTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setBookingData(prev => ({ ...prev, packageType: type.id }))}
                    className={`p-3 border rounded-lg text-center ${
                      bookingData.packageType === type.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="text-2xl mb-1">{type.icon}</div>
                    <div className="text-sm font-medium">{type.name}</div>
                    <div className="text-xs text-gray-600">From ${type.basePrice}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Delivery Speed</label>
              <div className="space-y-2">
                {urgencyOptions.map(option => (
                  <label key={option.id} className="flex items-center">
                    <input
                      type="radio"
                      name="urgency"
                      value={option.id}
                      checked={bookingData.urgency === option.id}
                      onChange={(e) => setBookingData(prev => ({ ...prev, urgency: e.target.value }))}
                      className="mr-3"
                    />
                    <span className="flex-1">{option.name}</span>
                    <span className="text-sm text-gray-600">+{Math.round((option.multiplier - 1) * 100)}%</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={bookingData.fragile}
                onChange={(e) => setBookingData(prev => ({ ...prev, fragile: e.target.checked }))}
                className="mr-3"
              />
              <span>Fragile item (+30%)</span>
            </label>
          </div>

          {/* Addresses */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Addresses</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Pickup Address</label>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows="2"
                  placeholder="Enter complete pickup address"
                  value={bookingData.pickupAddress}
                  onChange={(e) => setBookingData(prev => ({ ...prev, pickupAddress: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Delivery Address</label>
                <textarea
                  className="w-full p-3 border rounded-lg"
                  rows="2"
                  placeholder="Enter complete delivery address"
                  value={bookingData.deliveryAddress}
                  onChange={(e) => setBookingData(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Contact Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Sender Details</h4>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 border rounded mb-2"
                  value={bookingData.senderDetails.name}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    senderDetails: { ...prev.senderDetails, name: e.target.value }
                  }))}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full p-2 border rounded mb-2"
                  value={bookingData.senderDetails.phone}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    senderDetails: { ...prev.senderDetails, phone: e.target.value }
                  }))}
                />
              </div>
              <div>
                <h4 className="font-medium mb-2">Receiver Details</h4>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 border rounded mb-2"
                  value={bookingData.receiverDetails.name}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    receiverDetails: { ...prev.receiverDetails, name: e.target.value }
                  }))}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full p-2 border rounded mb-2"
                  value={bookingData.receiverDetails.phone}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    receiverDetails: { ...prev.receiverDetails, phone: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Price Estimate */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Estimated Price</h3>
                <p className="text-sm text-gray-600">Including all fees</p>
              </div>
              <div className="text-3xl font-bold text-green-600">
                ${bookingData.estimatedPrice}
              </div>
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBooking}
            disabled={!bookingData.fromCity || !bookingData.toCity || !bookingData.packageType}
            className="w-full bg-purple-600 text-white py-4 rounded-lg font-bold text-lg disabled:bg-gray-300"
          >
            Book Delivery - ${bookingData.estimatedPrice}
          </button>
        </div>
      </div>
    );
  }

  if (currentView === 'tracking') {
    const order = mockOrders[0]; // Using mock data for demo
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-purple-600 text-white p-4">
          <button 
            onClick={() => setCurrentView('home')}
            className="text-purple-200 mb-2"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">Track Package</h1>
          <p className="text-purple-200">Order ID: {order.id}</p>
        </div>

        <div className="p-4 space-y-4">
          {/* Status Card */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg">{order.from} → {order.to}</h3>
                <p className="text-gray-600">Estimated delivery: Tomorrow 8:00 AM</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">${order.price}</div>
                <div className="text-sm text-orange-600 font-medium">IN TRANSIT</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="relative">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Picked Up</span>
                <span>In Transit</span>
                <span>Delivered</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>

          {/* Driver Info */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-bold mb-3">Your Delivery Partner</h3>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                JD
              </div>
              <div className="flex-1">
                <div className="font-medium">{order.partner}</div>
                <div className="text-sm text-gray-600 flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  4.8 rating • 247 deliveries
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-green-500 text-white p-2 rounded-lg">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="bg-blue-500 text-white p-2 rounded-lg">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tracking Updates */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-bold mb-4">Tracking Updates</h3>
            <div className="space-y-4">
              {order.trackingUpdates.map((update, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-3 h-3 bg-purple-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="font-medium">{update.status}</div>
                    <div className="text-sm text-gray-600">{update.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">QuickMail</h1>
            <p className="text-purple-200">Fast intercity delivery in 24 hours</p>
          </div>
          <button 
            onClick={() => setUserType('partner')}
            className="bg-purple-500 px-4 py-2 rounded-lg text-sm"
          >
            Partner Login
          </button>
        </div>
        
        <div className="flex items-center text-purple-200">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">Available in 20+ cities across the US</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">24hrs</div>
            <div className="text-sm text-gray-600">Max delivery</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">$15+</div>
            <div className="text-sm text-gray-600">Starting price</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <Package className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">50K+</div>
            <div className="text-sm text-gray-600">Deliveries</div>
          </div>
        </div>

        {/* Main Actions */}
        <div className="space-y-4">
          <button 
            onClick={() => setCurrentView('booking')}
            className="w-full bg-purple-600 text-white p-6 rounded-lg flex items-center justify-center"
          >
            <Package className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-bold text-lg">Send Package</div>
              <div className="text-purple-200 text-sm">Book a new delivery</div>
            </div>
          </button>

          <button 
            onClick={() => setCurrentView('tracking')}
            className="w-full bg-white border-2 border-purple-600 text-purple-600 p-6 rounded-lg flex items-center justify-center"
          >
            <Navigation className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-bold text-lg">Track Package</div>
              <div className="text-gray-600 text-sm">Check delivery status</div>
            </div>
          </button>
        </div>

        {/* Features */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Why Choose QuickMail?</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
              <Clock className="w-8 h-8 text-purple-500 mr-4" />
              <div>
                <div className="font-bold">24-Hour Guarantee</div>
                <div className="text-sm text-gray-600">Delivery within 24 hours or money back</div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
              <DollarSign className="w-8 h-8 text-green-500 mr-4" />
              <div>
                <div className="font-bold">Competitive Pricing</div>
                <div className="text-sm text-gray-600">Best rates for intercity delivery</div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
              <CheckCircle className="w-8 h-8 text-blue-500 mr-4" />
              <div>
                <div className="font-bold">Real-time Tracking</div>
                <div className="text-sm text-gray-600">Know exactly where your package is</div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
              <User className="w-8 h-8 text-orange-500 mr-4" />
              <div>
                <div className="font-bold">Verified Partners</div>
                <div className="text-sm text-gray-600">All delivery partners are background checked</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDeliveryApp;