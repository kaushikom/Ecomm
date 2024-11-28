import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { Trophy } from "lucide-react";
// import ForgotPassword from "../pages/ForgotPassword";
// import { updateReview } from "../../../backend/src/controllers/reviewController";

axios.defaults.withCredentials = true;

const serverIp = "16.171.247.39";

const useStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  error: null,
  isLoggedIn: false,
  cat: [],
  services: [],
  tasks: [],
  payments: [],
  reviews: [],

  // User actions
  login: async (email, password) => {
    try {
      const response = await axios.post(
        "https://16.171.247.39:4000/api/user/login",
        {
          email,
          password,
        }
      );
      set({ user: response.data.user, error: null, isAuthenticated: true }); // adjust based on your response structure
      return response.data.user;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "Login failed"; // Get error message from response
      set({ error: errorMessage });
      throw new Error(errorMessage);
    }
  },
  updatePwd: async (userId, oldPassword, newPassword) => {
    try {
      const response = await axios.post(
        `https://${serverIp}:4000/api/user/updatePwd`,
        { userId, oldPassword, newPassword }
      );
      set({ user: response.data.user, error: null, isLoggedIn: true });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "Login failed"; // Get error message from response
      set({ error: errorMessage });
      throw new Error(errorMessage);
    }
  },
  update: async (userId, lastName, company, location, phone) => {
    console.log(phone);
    try {
      const response = await axios.post(
        `https://${serverIp}:4000/api/user/update`,
        {
          userId,
          lastName,
          company,
          location,
          phone,
        }
      );
      set({ user: response.data.user, error: null, isLoggedIn: true });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "Login failed"; // Get error message from response
      set({ error: errorMessage });
      throw new Error(errorMessage);
    }
  },
  signup: async (firstName, lastName, email, password) => {
    try {
      const response = await axios.post(
        `https://${serverIp}:4000/api/user/signup`,
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      set({ user: response.data, isAuthenticated: true, error: null }); // adjust based on your response structure
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "SignUp failed"; // Get error message from response
      set({ error: errorMessage });
      throw new Error(errorMessage);
    }
  },
  verifyEmail: async (verificationCode) => {
    try {
      const response = await axios.post(
        `https://${serverIp}:4000/api/user/verify`,
        {
          code: verificationCode,
        }
      );
      console.log(response.data);
      set({ user: response.data.user, isAuthenticated: true });
    } catch (error) {
      throw new Error(error);
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get(
        `https://${serverIp}:4000/api/user/check-auth`
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ isCheckingAuth: false, isAuthenticated: false });
      throw new Error(error.message);
    }
  },
  getUser: async (userId) => {
    try {
      const response = await axios.post(
        `https://${serverIp}:4000/api/user/getUser`,
        {
          userId,
        }
      );
      set({ user: response.data, error: null });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "SignUp failed"; // Get error message from response
      set({ error: errorMessage });
      throw new Error(errorMessage);
    }
  },
  logout: async () => {
    try {
      await axios.post(`https://${serverIp}:4000/api/user/logout`);
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  forgotPassword: async (email) => {
    try {
      const response = await axios.post(
        `https://${serverIp}:4000/api/user/forgot-password`,
        {
          email,
        }
      );
      return response.data.message;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  resetPassword: async (token, password) => {
    try {
      const response = await axios.post(
        `https://${serverIp}:4000/api/user/reset-password/${token}`,
        { password }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Categories actions
  getAllCat: async () => {
    try {
      const response = await axios.get(
        `https://${serverIp}:4000/api/category/fetchAll`
      );
      set({ cat: response.data.categories });
      return response.data.categories;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "SignUp failed"; // Get error message from response
      set({ error: errorMessage });
      throw new Error(errorMessage);
    }
  },
  addNewCat: async (name, imageUrl, navDisplay, description) => {
    try {
      const response = await axios.post(
        `https://${serverIp}:4000/api/category/add`,
        {
          name,
          imageUrl,
          navDisplay,
          description,
        }
      );
      const currentCat = get().cat;
      set({
        cat: [...currentCat, response.data.category],
        error: null,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteCat: async (id) => {
    try {
      const response = await axios.post(
        `https://${serverIp}:4000/api/category/delete`,
        {
          id,
        }
      );
      const currentCat = get().cat;
      set({
        cat: currentCat.filter((c) => c._id !== response.data.category._id),
        error: null,
      });
      return response.data;
    } catch (error) {
      set({ error });
      throw new Error(error.message);
    }
  },
  updateCat: async (id, name, imageUrl, navDisplay, description) => {
    try {
      const response = await axios.put(
        `https://${serverIp}:4000/api/category/update`,
        {
          id,
          name,
          imageUrl,
          navDisplay,
          description,
        }
      );
      set((state) => ({
        cat: state.cat.map((c) => (c._id === id ? response.data.category : c)),
      }));
      return response.data.category;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  categories: [
    {
      id: 1,
      name: "IT",
      image:
        "httpss://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg",
      description:
        "Offering IT services like web development, app development, and hosting.",
      tasks: [
        {
          id: 1,
          name: "Web Development",
          minPrice: 500,
          maxPrice: 800,
          image:
            "httpss://www.qanmos.com/wp-content/uploads/2024/07/1685618197hitech-56458a.jpg",
        },
        {
          id: 2,
          name: "App Development",
          minPrice: 700,
          maxPrice: 900,
          image: "httpss://ik.trn.asia/uploads/2024/01/1706240490715.png",
        },
        {
          id: 3,
          name: "Hosting Setup",
          minPrice: 140,
          maxPrice: 300,
          image:
            "httpss://blog.stoneriverelearning.com/wp-content/uploads/2017/06/CODEHOST111.png",
        },
      ],
    },
    {
      id: 2,
      name: "AI & Automation",
      image:
        "httpss://images.pexels.com/photos/5473325/pexels-photo-5473325.jpeg",
      description:
        "Leverage AI technologies and automation to enhance business processes.",
      tasks: [
        {
          id: 1,
          name: "AI Chatbot",
          minPrice: 600,
          maxPrice: 1200,
          image:
            "httpss://cdn.pixabay.com/photo/2023/02/04/17/28/chat-7767693_640.jpg",
        },
        {
          id: 2,
          name: "Workflow Automation",
          minPrice: 450,
          maxPrice: 900,
          image:
            "httpss://res.cloudinary.com/dlpitjizv/image/upload/v1688671391/impact/10_benefits_of_process_automation_Hero_D_2029e82b8a.jpg",
        },
      ],
    },
    {
      id: 3,
      name: "Digital Marketing",
      image:
        "httpss://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      description:
        "Boost your online presence with SEO, social media marketing, and more.",
      tasks: [
        {
          id: 1,
          name: "SEO Optimization",
          minPrice: 600,
          maxPrice: 900,
          image:
            "httpss://electricenjin.com/img/cms/blogimageassets/What-You-Should-Know-About-Optimizing-Your-Website-for-Performance.jpg",
        },
        {
          id: 2,
          name: "Social Media Handling",
          minPrice: 400,
          maxPrice: 700,
          image:
            "httpss://static1.makeuseofimages.com/wordpress/wp-content/uploads/2024/08/some-3d-social-media-icons.jpg",
        },
        {
          id: 3,
          name: "Content Creation",
          minPrice: 250,
          maxPrice: 900,
          image:
            "httpss://growthfolks.io/wp-content/uploads/2024/04/video-content-creation-1024x585.png",
        },
      ],
    },
    {
      id: 4,
      name: "Automation",
      image:
        "httpss://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg",
      description:
        "Consult with experts to develop strategies for business and technology.",
      tasks: [
        {
          id: 1,
          name: "Business Strategy",
          minPrice: 999,
          maxPrice: 1499,
          image:
            "httpss://herculeschess.com/wp-content/themes/herculeschess/images/what-chess-puzzles.jpg",
        },
        {
          id: 2,
          name: "Tech Consulting",
          minPrice: 850,
          maxPrice: 1200,
          image:
            "httpss://savvycomsoftware.com/wp-content/uploads/2021/03/tech-consulting-services-4.jpg",
        },
      ],
    },
  ],
  blogs: [
    {
      id: 1,
      date: "25 January 2018",
      title: "The Art of Mindfulness in Daily Life",
      author: "Admin Admin",
      hits: 5,
      comments: 10,
      snippet:
        "Exploring the benefits of mindfulness in our fast-paced world...",
      content:
        "Many of us today are living at a fast pace, and we can ﬁnd ourselves overwhelmed by constant demands and distractions. Someone juggling multiple responsibilities, such as a working parent, a student balancing academic and personal life, or a professional facing burnout, might particularly beneﬁt from mindfulness. They may feel disconnected from the present moment, burdened by stress, and unable to fully engage with their surroundings or their professional life. Mindfulness offers them a way to ground, reduce anxiety, and ﬁnd clarity amid chaosResearch has consistently shown that practicing mindfulness can signiﬁcantly improve functionality, particularly in individuals with chronic illnesses, chronic pain, and even neurodegenerative conditions like dementia and Alzheimer’s. Dr. Ellen Langer’s groundbreaking work at the Langer Lab has also explored mindfulness across multiple domains, including health, business, and education, with compelling results.In one fascinating study involving professional salespeople, two groups were instructed to engage with potential clients in contrasting ways—one group mindfully, the other ‘mindlessly’. The mindful group saw noticeably higher sales, demonstrating that mindfulness enhances focus, engagement, and overall productivity. This principle extends beyond sales, helping individuals and companies alike boost performance and maintain focus.",
      image:
        "httpss://images.pexels.com/photos/289586/pexels-photo-289586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      date: "26 January 2018",
      title: "Sustainable Living: Small Changes, Big Impact",
      author: "Admin Admin",
      hits: 5,
      comments: 10,
      snippet:
        "Discover how small lifestyle changes can contribute to a more sustainable future...",
      content:
        "Many of us today are living at a fast pace, and we can ﬁnd ourselves overwhelmed by constant demands and distractions. Someone juggling multiple responsibilities, such as a working parent, a student balancing academic and personal life, or a professional facing burnout, might particularly beneﬁt from mindfulness. They may feel disconnected from the present moment, burdened by stress, and unable to fully engage with their surroundings or their professional life. Mindfulness offers them a way to ground, reduce anxiety, and ﬁnd clarity amid chaosResearch has consistently shown that practicing mindfulness can signiﬁcantly improve functionality, particularly in individuals with chronic illnesses, chronic pain, and even neurodegenerative conditions like dementia and Alzheimer’s. Dr. Ellen Langer’s groundbreaking work at the Langer Lab has also explored mindfulness across multiple domains, including health, business, and education, with compelling results.In one fascinating study involving professional salespeople, two groups were instructed to engage with potential clients in contrasting ways—one group mindfully, the other ‘mindlessly’. The mindful group saw noticeably higher sales, demonstrating that mindfulness enhances focus, engagement, and overall productivity. This principle extends beyond sales, helping individuals and companies alike boost performance and maintain focus.",
      image:
        "httpss://images.pexels.com/photos/1292464/pexels-photo-1292464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    // Add more sample blog posts here
  ],

  // Services actions
  getServices: async (categoryId) => {
    try {
      let url = `https://${serverIp}:4000/api/service/fetchByCategory`;
      if (categoryId) {
        url = `https://${serverIp}:4000/api/service/fetchByCategory/${categoryId}`;
      }
      const response = await axios.get(url);
      set({ services: response.data.services });
      // console.log(response.data.services);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  addService: async (
    name,
    categoryId,
    minPrice,
    maxPrice,
    imageUrl,
    description,
    tags
  ) => {
    try {
      const response = await axios.post(
        `https://${serverIp}:4000/api/service/addNew`,
        { name, categoryId, minPrice, maxPrice, imageUrl, description, tags }
      );
      return response.success;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  updateService: async (
    id,
    name,
    minPrice,
    maxPrice,
    imageUrl,
    description,
    tags
  ) => {
    try {
      const response = await axios.put(
        `https://${serverIp}:4000/api/service/update`,
        { id, name, minPrice, maxPrice, imageUrl, description, tags }
      );
      return response.success;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteService: async (id) => {
    try {
      const response = await axios.delete(
        `https://${serverIp}:4000/api/service/delete/${id}`
      );
      console.log(id);
      return response.success;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Faq actions
  addFAQ: async (serviceId, question, answer) => {
    try {
      const response = await axios.post(
        `https://${serverIp}:4000/api/service/${serviceId}/faqs`,
        { question, answer }
      );

      set((state) => ({
        services: state.services.map((service) =>
          service._id === serviceId
            ? { ...service, faqs: response.data.service.faqs } // Use the complete updated faqs array
            : service
        ),
      }));

      return response.data.service.faqs; // Return the complete faqs array instead of just the new FAQ
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },
  updateFAQ: async (serviceId, faqId, question, answer) => {
    try {
      const response = await axios.put(
        `https://${serverIp}:4000/api/service/${serviceId}/faqs/${faqId}`,
        { question, answer }
      );
      if (response.data.success) {
        set((state) => ({
          services: state.services.map((service) =>
            service._id === serviceId
              ? { ...service, faqs: response.data.service.faqs }
              : service
          ),
        }));
        return response.data.service.faqs;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteFAQ: async (serviceId, faqId) => {
    try {
      const response = await axios.delete(
        `https://${serverIp}:4000/api/service/${serviceId}/faqs/${faqId}`
      );
      set((state) => ({
        services: state.services.map((service) =>
          service._id === serviceId
            ? {
                ...service,
                faqs: service.faqs.filter((faq) => faq._id !== faqId),
              }
            : service
        ),
      }));
      return response.data.success;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Reviews
  getAllReviews: async () => {
    try {
      const response = await axios.get(
        `https://${serverIp}:4000/api/review/getAll`
      );
      set({ reviews: response.data.reviews });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getAverageRating: async (serviceId) => {
    try {
      const response = await axios.get(
        `https://${serverIp}:4000/api/review/averageRating/${serviceId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getReviewsByService: async (serviceId) => {
    try {
      const response = await axios.get(
        `https://${serverIp}:4000/api/review/getBy/service/${serviceId}`
      );
      return response.data.reviews;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getReviewByTask: async (taskId) => {
    try {
      const response = await axios.get(
        `https://${serverIp}:4000/api/review/getBy/task/${taskId}`
      );
      return response.data.reviews[0];
    } catch (error) {
      throw new Error(error.message);
    }
  },
  addReview: async (taskId, rating, description) => {
    try {
      const response = await axios.post(
        `https://${serverIp}:4000/api/review/add/${taskId}`,
        { rating, description }
      );
      return response.data.review;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  updateReview: async (reviewId, rating, description) => {
    try {
      const response = await axios.put(
        `https://${serverIp}:4000/api/review/update/${reviewId}`,
        {
          rating,
          description,
        }
      );
      return response.data.updatedReview;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteReview: async (reviewId) => {
    try {
      const response = await axios.delete(
        `https://${serverIp}:4000/api/review/delete/${reviewId}`
      );
      return response.data.success;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Task actions
  addTask: async (serviceId, userId, message) => {
    try {
      const response = await axios.post(
        `https://${serverIp}:4000/api/task/add`,
        {
          serviceId,
          userId,
          message,
        }
      );
      return response.success;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getAllTasks: async () => {
    try {
      const response = await axios.get(`https://${serverIp}:4000/api/task/get`);
      set({ tasks: response.data.tasks });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getTasksByStatus: async (status) => {
    try {
      const response = await axios.get(
        `https://${serverIp}:4000/api/task/getByStatus/${status}`
      );
      set({ tasks: response.data.tasks });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getTasksByUser: async (id) => {
    try {
      const response = await axios.get(
        `https://${serverIp}:4000/api/task/getByUser/${id}`
      );
      set({ tasks: response.data.tasks });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  updateTaskStatus: async (id, newStatus) => {
    try {
      await axios.put(`https://${serverIp}:4000/api/task/update`, {
        id,
        newStatus,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteTask: async (id) => {
    try {
      await axios.delete(`https://${serverIp}:4000/api/task/delete/${id}`);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Payments actions
  getPaymentsByUser: async (userId) => {
    try {
      const response = await axios.get(
        `https://${serverIp}:4000/api/payment/fetch/${userId}`
      );
      set({ payments: response.data.data });
      // console.log(response.data.data);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getPaymentsByTask: async (taskId) => {
    try {
      const response = await axios.get(
        `https://${serverIp}:4000/api/payment/fetchByTask/${taskId}`
      );
      set({ payments: response.data.payments });
      return response.data.task;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  addPayments: async (taskId, amount, milestone, description, dueDate) => {
    try {
      const response = await axios.post(
        `https://${serverIp}:4000/api/payment/addNew`,
        {
          task: taskId,
          amount,
          milestone,
          description,
          dueDate,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      throw new Error(error);
    }
  },
  deletePayment: async (paymentId) => {
    try {
      const response = await axios.delete(
        `https://${serverIp}:4000/api/payment/delete/${paymentId}`
      );
      console.log(response);
    } catch (error) {
      throw new Error(error);
    }
  },
  updatePayment: async (paymentId, amount, milestone, description, dueDate) => {
    try {
      const response = await axios.post(
        `https://${serverIp}:4000/api/payment/update`,
        {
          paymentId,
          amount,
          milestone,
          description,
          dueDate,
        }
      );
      console.log(response);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Cart actions and state
  cart: [],
  addToCart: (categoryId, item) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (cartItem) =>
          cartItem.categoryId === categoryId && cartItem.id === item.id
      );

      if (existingItemIndex > -1) {
        // If item is already in the cart, update the quantity
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        return { cart: updatedCart };
      } else {
        // Add new item to the cart
        return {
          cart: [...state.cart, { ...item, categoryId, quantity: 1 }],
        };
      }
    }),
  updateCartItem: (categoryId, taskId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.categoryId === categoryId && item.id === taskId
          ? { ...item, quantity }
          : item
      ),
    })),
  removeFromCart: (categoryId, taskId) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.categoryId === categoryId && item.id === taskId)
      ),
    })),
  clearCart: () => set({ cart: [] }),
}));

export default useStore;
