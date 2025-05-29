import { createContext, useContext, useState, useEffect } from 'react';

const ServiceContext = createContext();

export const useService = () => useContext(ServiceContext);

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Initialize with sample data
    const sampleServices = [
      {
        id: '1',
        title: 'Professional Mixing & Mastering',
        description: 'Get your tracks professionally mixed and mastered with industry-standard equipment and techniques.',
        price: 120,
        category: 'Mixing',
        image: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        sellerName: 'Alex Johnson',
        sellerAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 4.8,
        reviews: 124,
        communityId: '1',
        createdAt: '2023-05-10T14:30:00Z'
      },
      {
        id: '2',
        title: 'Custom Beat Production',
        description: 'I will create a custom beat tailored to your style and preferences. Includes 2 revisions.',
        price: 85,
        category: 'Production',
        image: 'https://images.pexels.com/photos/1001850/pexels-photo-1001850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        sellerName: 'Maria Rodriguez',
        sellerAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 4.6,
        reviews: 89,
        communityId: '2',
        createdAt: '2023-04-22T09:15:00Z'
      },
      {
        id: '3',
        title: 'Vocal Recording Session',
        description: 'Professional vocal recording in a high-quality studio with an experienced sound engineer.',
        price: 150,
        category: 'Recording',
        image: 'https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        sellerName: 'David Kim',
        sellerAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        rating: 4.9,
        reviews: 56,
        communityId: '3',
        createdAt: '2023-06-05T11:45:00Z'
      },
      {
        id: '4',
        title: 'Music Marketing Strategy',
        description: 'Comprehensive marketing strategy for your music release, including social media, playlists, and PR.',
        price: 200,
        category: 'Marketing',
        image: 'https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        sellerName: 'Sarah Williams',
        sellerAvatar: 'https://randomuser.me/api/portraits/women/67.jpg',
        rating: 4.7,
        reviews: 42,
        communityId: '1',
        createdAt: '2023-05-18T16:20:00Z'
      },
      {
        id: '5',
        title: 'Custom Song Composition',
        description: 'I will compose a complete song based on your ideas, including arrangement and production.',
        price: 250,
        category: 'Composition',
        image: 'https://images.pexels.com/photos/4088012/pexels-photo-4088012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        sellerName: 'James Wilson',
        sellerAvatar: 'https://randomuser.me/api/portraits/men/52.jpg',
        rating: 4.9,
        reviews: 37,
        communityId: '2',
        createdAt: '2023-06-12T10:10:00Z'
      },
      {
        id: '6',
        title: 'Album Cover Design',
        description: 'Professional album cover design that captures the essence of your music. Includes 3 concepts.',
        price: 95,
        category: 'Design',
        image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        sellerName: 'Emma Thompson',
        sellerAvatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        rating: 4.8,
        reviews: 64,
        communityId: '3',
        createdAt: '2023-04-30T13:25:00Z'
      }
    ];
    
    setServices(sampleServices);
  }, []);

  // In a real app, these would make API calls
  const getAllServices = () => {
    return services;
  };

  const getService = (id) => {
    return services.find(service => service.id === id);
  };

  const getServicesByCommunity = (communityId) => {
    if (communityId === 'all') {
      return services;
    }
    return services.filter(service => service.communityId === communityId);
  };

  const createService = (serviceData) => {
    const newService = {
      id: Date.now().toString(),
      ...serviceData,
      createdAt: new Date().toISOString(),
      rating: 0,
      reviews: 0
    };
    setServices([...services, newService]);
    return newService;
  };

  const updateService = (id, serviceData) => {
    const updatedServices = services.map(service => 
      service.id === id ? { ...service, ...serviceData } : service
    );
    setServices(updatedServices);
    return updatedServices.find(service => service.id === id);
  };

  const deleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <ServiceContext.Provider value={{ 
      services,
      getAllServices,
      getService,
      getServicesByCommunity,
      createService,
      updateService,
      deleteService
    }}>
      {children}
    </ServiceContext.Provider>
  );
};
