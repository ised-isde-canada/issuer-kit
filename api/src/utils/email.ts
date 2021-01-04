import { HookContext } from "@feathersjs/feathers";
import { loadFileAsText } from "./load-config-file";
import logger from "../logger";

/**
 * Replace the contents of the string template based on a context
 * See https://stackoverflow.com/a/55594573/10382626
 * @param str the string to process
 * @param obj the context used for template replacement
 */
const inject = (str: string, obj: { [index: string]: any }) =>
  str.replace(/\${(.*?)}/g, (x: string, g: string) => obj[g]);

export async function sendEmail(context: HookContext) {

    console.log(`This is the relationship  ${context.data.data.relationship}`);
  const settings = context.app.get("emailSettings");
  const inviteUrl;
  if (!context.data.data.relationship){
     inviteUrl = `${context.app.get("publicSite").url}/?invite_token=${
      context.result.token
    }`;
  } else {
     inviteUrl = `${context.app.get("publicSiteVR").url}/?invite_token=${
      context.result.token
    }`;
  }

  settings.inviteUrl = inviteUrl; // add to default object used for string replacement
  const emailBodyTemplate = loadFileAsText(
    settings.emailTemplate || "invite-email.html"
  );

  // Replace variables in email template with provided context from configuration
  const emailBody = inject(emailBodyTemplate, settings);
  const email;
  if (!context.data.data.relationship) {
   email = {
    to: context.data.email,
    subject: settings.subject,
    html: emailBody,
  };
 } else {
    email = {
    to: context.data.email,
    subject: settings.subjectVR,
    html: emailBody,
  };
}
  await context.app.service("mailer").create(email);
  return context;
}
