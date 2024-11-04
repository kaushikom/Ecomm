import { mailtrapClient, sender } from "./config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_UPDATE_CONFIRMATION_TEMPLATE,
  STATUS_UPDATE_TEMPLATE,
  QUERY_RECEIVED_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verfiy your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    throw new Error("Error sending verification email: ", error);
  }
};
export const sendWelcomeEmail = async (email, username) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "4bdbc6d7-9b0b-4260-b755-099899acdced",
      template_variables: {
        name: username,
        company_info_name: "Code Bacward Lab",
        company_info_address: "New Delhi, India",
        company_info_city: "Delhi",
        company_info_zip_code: "110093",
        company_info_country: "India",
      },
    });
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw new Error("Error sending welcome email", error);
  }
};
export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.log("Error sending password reset email", error);
    throw new Error("Error sending password reset email", error);
  }
};
export const sendPasswordUpdateEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password updated",
      html: PASSWORD_UPDATE_CONFIRMATION_TEMPLATE,
      category: "Password Updated",
    });
  } catch (error) {
    console.log("Error sending password update email", error);
    throw new Error("Error sending password update email", error);
  }
};
export const sendStatusUpdateEmail = async (email, taskStatus, taskName) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Status updated",
      html: STATUS_UPDATE_TEMPLATE.replace("{taskName}", taskName).replace(
        "{taskStatus}",
        taskStatus
      ),
      category: "Status updated",
    });
  } catch (error) {
    console.log("Error sending status update email", error);
    throw new Error("Error sending status update email", error);
  }
};
export const sendQueryReceivedEmail = async (
  email,
  queryTitle,
  queryDescription
) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Request Received",
      html: QUERY_RECEIVED_TEMPLATE.replace("{queryTitle}", queryTitle).replace(
        "{queryDetails}",
        queryDescription
      ),
      category: "Status updated",
    });
  } catch (error) {
    console.log("Error sending status update email", error);
    throw new Error("Error sending status update email", error);
  }
};
export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.log("Error sending password reset email", error);
    throw new Error("Error sending password reset email", error);
  }
};
