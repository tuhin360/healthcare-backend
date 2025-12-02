import axios from "axios";
import config from "../../../config";
import prisma from "../../../Shared/prisma";
import { email } from "zod";
import { SSLService } from "../SSL/ssl.service";

const initPayment = async (appointmentId: string) => {
  const paymentData = await prisma.payment.findFirstOrThrow({
    where: {
      appointmentId,
    },
    include: {
      appointment: {
        include: {
          patient: true,
        },
      },
    },
  });

  const initPayment = {
    amount: paymentData.amount,
    transactionId: paymentData.transactionId,
    name: paymentData.appointment.patient.name,
    email: paymentData.appointment.patient.email,
    address: paymentData.appointment.patient.address,
    phoneNumber: paymentData.appointment.patient.contactNumber,
  };

  const result = await SSLService.initPayment(initPayment);
  return {
    PaymentUrl: result.GatewayPageURL,
  };
};

export const PaymentService = {
  initPayment,
};
