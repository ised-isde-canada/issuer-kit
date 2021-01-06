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

  if (!context.data.data.relationship){
    const inviteUrl = `${context.app.get("publicSite").url}/?invite_token=${
      context.result.token
    }`;
      settings.inviteUrl = inviteUrl;
  } else {
    const  inviteUrl = `${context.app.get("publicSiteVR").url}/?invite_token=${
      context.result.token
    }`;
    settings.inviteUrl = inviteUrl;
  }

 // add to default object used for string replacement

   let emailBodyTemplate;
   if (!context.data.data.relationship){
     emailBodyTemplate = loadFileAsText(
     settings.emailTemplate || "invite-email.html"
     );
   } else{
    emailBodyTemplate = loadFileAsText(
    settings.emailTemplate || "invite-email-vr.html"
  );
}

  // Replace variables in email template with provided context from configuration
  const emailBody = inject(emailBodyTemplate, settings);

  if (!context.data.data.relationship) {
   const email = {
    to: context.data.email,
    subject: settings.subject,
    html: emailBody,
  };
  await context.app.service("mailer").create(email);
  return context;
 } else {
    const email = {
    to: context.data.email,
    subject: settings.subjectVR,
    html: emailBody,
  };
  await context.app.service("mailer").create(email);
  return context;
}

}
