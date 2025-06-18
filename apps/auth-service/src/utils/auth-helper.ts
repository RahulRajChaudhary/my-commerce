
import crypto from 'crypto';
import { ValidationError } from '../../../../packages/error-handler/index';


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegistrationData = (data: any, userType: 'user' | 'seller') => { 
  const { name, email, password, phone_number, country } = data;
  
  if (
       !name
    || !email
    || !password
    || !phone_number
    || (userType === 'seller' && (!country || !phone_number))) {
    throw new ValidationError('Missing required fields');
  }
  
  if(!emailRegex.test(email)) {
    throw new ValidationError('Invalid email');
  }
  
  
}

export const checkOtpRestrictions = async (email: string, next: NewableFunction) => {
  
}


export const sendOtp = async (name: string, email: string ,template: string) => {
  const otp = crypto.randomInt(1000, 9999).toString;
  
  // seting the otp in redis database with expire
}