import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import DateFormatter from '../../components/DateFormatter'
import {loadStripe} from '@stripe/stripe-js'
import axios from 'axios'
import useStore from '../../store/store'

const PaidCard = ({payment}) => {
  console.log(payment)
  return(
      <div className='p-4 border-[2px] border-emerald-400 bg-emerald-50 rounded-md shadow-md max-w-[500px] my-8'>
          {/* status badge */}
          <div className='w-[90px] text-center my-4 uppercase font-semibold px-4 py-2 text-white rounded-full  bg-gradient-to-r from-emerald-600 to-emerald-800'>Paid</div>
          <h1 className='text-xl font-semibold'>{payment.milestone}</h1>
          <p className='my-4 font-semibold text-slate-600'>{payment.description ?? ''}</p>
          <button className='px-4 py-2 text-white rounded-lg bg-emerald-950 hover:bg-emerald-900'>View Details</button>
          <p className='flex items-center justify-between'>Paid on <DateFormatter date={payment.updatedAt} /><span className='text-3xl font-bold'>${payment.amount}</span></p>
         </div>
  )
}
const UpcomingCard = ({payment}) => {
   const makePayment = async (paymentId) => {
    const stripe = await loadStripe('pk_test_51MmxiySCi4mhFbr9FP1JGQc5Goshkrtt2DkRaa6wkahArGt9tBaqrLFXWQ24k8sUbCEejgHuC6xqem74TYCB3rHC00zDpFgvW7');
    const response = await axios.post("http://localhost:4000/api/payment/create-checkout-session", {
      paymentId,
      successUrl: "http://localhost:5173/user/payments",
      cancelUrl: "http://localhost:5173/failed"
    });
    console.log(response);
    const result = stripe.redirectToCheckout({
      sessionId: response.data.id
    });
    if (result.error) {
      console.log(result.error);
    }
  };

return( <div className='p-4 bg-orange-50 border-2 border-orange-400 rounded-md shadow-md max-w-[500px] my-8'>
          {/* status badge */}
          <div className='w-[120px] text-center my-4 uppercase font-semibold px-4 py-2 text-white rounded-full  bg-gradient-to-r from-orange-600 to-orange-700'>Upcoming</div>
          <h1 className='text-xl font-semibold'>{payment.milestone}</h1>
          <p className='my-4 font-semibold text-slate-600'>{payment.description ?? ''}</p>
            <button onClick={()=>makePayment(payment._id)} className='px-4 py-2 text-white rounded-lg bg-orange-950 hover:bg-orange-900'>Pay Now</button>
          <p className='flex items-center justify-between'>Due on: {payment.dueDate ?? 'No Due Date'}<span className='text-3xl font-bold'>${payment.amount}</span></p>
         </div>)
}
const CompletedCard = () => {
  return(
     <div className='p-4 bg-white rounded-md shadow-md max-w-[500px] my-8'>
          {/* status badge */}
          <div className='w-[120px] text-center my-4 uppercase font-semibold px-4 py-2 text-white rounded-full  bg-gradient-to-r from-gray-600 to-gray-700'>Completed</div>
          <h1 className='text-xl font-semibold'>Miltestone 1</h1>
          <p className='my-4 font-semibold text-slate-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, placeat!</p>
          <p className='flex items-center justify-between'>Due on March 3, 2024<span className='text-3xl font-bold'>$250</span></p>
         </div>
  )
}

const Payments = () => {
  const { payments, getPaymentsByUser, user } = useStore();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setPayments(user._id);
  }, []);

  const setPayments = async (id) => {
    setLoading(true);
    try {
      await getPaymentsByUser(id);
      console.log(payments)
    } catch (error) {
      console.log("Error while fetching payments: ", error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const makePayment = async (paymentId) => {
    console.log(paymentId);
    const stripe = await loadStripe('pk_test_51QEqIkJRyLlF3zDn6sLIOmtJ4WPUd73AulisvZLX7HRNN1qIFL1NM7CVVv4TqTtzmelrEALYaWWo6krPjM4QkRML00E7TMWWHi');
    const response = await axios.post("http://localhost:4000/api/payment/create-checkout-session", {
      paymentId: 555,
      successUrl: "http://localhost:5173/success",
      cancelUrl: "http://localhost:5173/failed"
    });
    console.log(response);
    const result = stripe.redirectToCheckout({
      sessionId: response.data.id
    });
    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-grow p-8">
        <h1 className='text-4xl'>Payments</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-4">
            {payments?.map((payment) => {
              // Check if the task is completed
              const isCompleted = payment.status === "paid";
              
              return isCompleted ? (
                <PaidCard
                  key={payment._id}
                  payment={payment}
           
                />
              ) : (
                <UpcomingCard
                  key={payment._id}
                  payment={payment}
           
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Payments