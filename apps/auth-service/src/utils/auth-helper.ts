
import crypto from 'crypto';
import { ValidationError } from '../../../../packages/error-handler/index';
import redis from '../../../../packages/libs/redis/index';


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


export const sendOtp = async (
  name: string,
  email: string,
  template: string
) => {
  const otp = crypto.randomInt(1000, 9999).toString();
  await sendEmail(email, "Verify Your Email", template, { name, otp });
  await redis.set(`otp:${email}`, otp, "EX", 300);
  await redis.set(`otp_cooldown:${email}`, "true", "EX", 60);
};