import { PageHero } from '@/components/ui/PageHero';
import { Box, Container, Link, Typography } from '@mui/material';
import { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Doctor Doorstep Privacy Policy. Learn how we handle and protect your data.',
};

const EMAIL = 'admin@doctordoorstep.com';

const emailLink = (
  <Link href={`mailto:${EMAIL}`} underline="hover">
    {EMAIL}
  </Link>
);

const contactLink = (
  <Link href="#contact" underline="hover">
    HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
  </Link>
);

const tocItems: [string, string][] = [
  ['infocollect', '1. WHAT INFORMATION DO WE COLLECT?'],
  ['infouse', '2. HOW DO WE PROCESS YOUR INFORMATION?'],
  ['whoshare', '3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?'],
  ['cookies', '4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?'],
  ['inforetain', '5. HOW LONG DO WE KEEP YOUR INFORMATION?'],
  ['infosafe', '6. HOW DO WE KEEP YOUR INFORMATION SAFE?'],
  ['infominors', '7. DO WE COLLECT INFORMATION FROM MINORS?'],
  ['privacyrights', '8. WHAT ARE YOUR PRIVACY RIGHTS?'],
  ['DNT', '9. CONTROLS FOR DO-NOT-TRACK FEATURES'],
  ['policyupdates', '10. DO WE MAKE UPDATES TO THIS NOTICE?'],
  ['contact', '11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?'],
  ['request', '12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?'],
];

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <Box id={id} sx={{ mb: 6, scrollMarginTop: 96 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 700 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return (
    <Typography variant="h6" component="h3" sx={{ mt: 3, mb: 1, fontWeight: 700 }}>
      {children}
    </Typography>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
      {children}
    </Typography>
  );
}

function Short({ children }: { children: ReactNode }) {
  return (
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
      <strong>In Short:</strong> {children}
    </Typography>
  );
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <Box component="ul" sx={{ color: 'text.secondary', pl: 3, mb: 2 }}>
      {items.map((item, i) => (
        <Typography key={i} component="li" variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
          {item}
        </Typography>
      ))}
    </Box>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" subtitle="Last updated: October 02, 2026" />

      <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
          <P>
            This Privacy Notice for Doctor Doorstep (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), describes how
            and why we might access, collect, store, use, and/or share (&quot;process&quot;) your personal information
            when you use our services (&quot;Services&quot;), including when you:
          </P>
          <Bullets
            items={[
              <>
                Visit our website at{' '}
                <Link href="https://www.doctordoorstep.com/" underline="hover">
                  https://www.doctordoorstep.com/
                </Link>{' '}
                or any website of ours that links to this Privacy Notice
              </>,
              'Engage with us in other related ways, including any marketing or events',
            ]}
          />
          <P>
            <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy
            rights and choices. We are responsible for making decisions about how your personal information is
            processed. If you do not agree with our policies and practices, please do not use our Services. If you
            still have any questions or concerns, please contact us at {emailLink}.
          </P>

          <Typography variant="h4" component="h2" sx={{ mt: 5, mb: 2, fontWeight: 700 }}>
            SUMMARY OF KEY POINTS
          </Typography>
          <P>
            This summary provides key points from our Privacy Notice, but you can find out more details about any of
            these topics by clicking the link following each key point or by using our{' '}
            <Link href="#toc" underline="hover">
              table of contents
            </Link>{' '}
            below to find the section you are looking for.
          </P>
          <P>
            <strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we
            may process personal information depending on how you interact with us and the Services, the choices you
            make, and the products and features you use. Learn more about{' '}
            <Link href="#infocollect" underline="hover">
              personal information you disclose to us
            </Link>
            .
          </P>
          <P>
            <strong>Do we process any sensitive personal information?</strong> Some of the information may be
            considered &quot;special&quot; or &quot;sensitive&quot; in certain jurisdictions, for example your racial
            or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal
            information.
          </P>
          <P>
            <strong>Do we collect any information from third parties?</strong> We do not collect any information from
            third parties.
          </P>
          <P>
            <strong>How do we process your information?</strong> We process your information to provide, improve, and
            administer our Services, communicate with you, for security and fraud prevention, and to comply with law.
            We may also process your information for other purposes with your consent. We process your information only
            when we have a valid legal reason to do so. Learn more about{' '}
            <Link href="#infouse" underline="hover">
              how we process your information
            </Link>
            .
          </P>
          <P>
            <strong>In what situations and with which parties do we share personal information?</strong> We may share
            information in specific situations and with specific third parties. Learn more about{' '}
            <Link href="#whoshare" underline="hover">
              when and with whom we share your personal information
            </Link>
            .
          </P>
          <P>
            <strong>How do we keep your information safe?</strong> We have adequate organizational and technical
            processes and procedures in place to protect your personal information. However, no electronic transmission
            over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot
            promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to
            defeat our security and improperly collect, access, steal, or modify your information. Learn more about{' '}
            <Link href="#infosafe" underline="hover">
              how we keep your information safe
            </Link>
            .
          </P>
          <P>
            <strong>What are your rights?</strong> Depending on where you are located geographically, the applicable
            privacy law may mean you have certain rights regarding your personal information. Learn more about{' '}
            <Link href="#privacyrights" underline="hover">
              your privacy rights
            </Link>
            .
          </P>
          <P>
            <strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by visiting{' '}
            <Link href="https://doctordoorstep.com/" underline="hover">
              https://doctordoorstep.com/
            </Link>
            , or by contacting us. We will consider and act upon any request in accordance with applicable data
            protection laws.
          </P>
          <P>
            Want to learn more about what we do with any information we collect?{' '}
            <Link href="#toc" underline="hover">
              Review the Privacy Notice in full
            </Link>
            .
          </P>

          <Box id="toc" sx={{ mt: 5, mb: 6, scrollMarginTop: 96 }}>
            <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 700 }}>
              TABLE OF CONTENTS
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {tocItems.map(([id, label]) => (
                <Box component="li" key={id} sx={{ mb: 1 }}>
                  <Link href={`#${id}`} underline="hover">
                    {label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>

          <Section id="infocollect" title="1. WHAT INFORMATION DO WE COLLECT?">
            <SubHeading>Personal information you disclose to us</SubHeading>
            <Short>We collect personal information that you provide to us.</Short>
            <P>
              We collect personal information that you voluntarily provide to us when you register on the Services,
              express an interest in obtaining information about us or our products and Services, when you participate
              in activities on the Services, or otherwise when you contact us.
            </P>
            <P>
              <strong>Personal Information Provided by You.</strong> The personal information that we collect depends
              on the context of your interactions with us and the Services, the choices you make, and the products and
              features you use. The personal information we collect may include the following:
            </P>
            <Bullets
              items={[
                'names',
                'phone numbers',
                'email addresses',
                'mailing addresses',
                'usernames',
                'passwords',
                'contact preferences',
                'contact or authentication data',
                'billing addresses',
              ]}
            />
            <Box id="sensitiveinfo">
              <P>
                <strong>Sensitive Information.</strong> We do not process sensitive information.
              </P>
            </Box>
            <P>
              All personal information that you provide to us must be true, complete, and accurate, and you must notify
              us of any changes to such personal information.
            </P>

            <SubHeading>Information automatically collected</SubHeading>
            <Short>
              Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics —
              is collected automatically when you visit our Services.
            </Short>
            <P>
              We automatically collect certain information when you visit, use, or navigate the Services. This
              information does not reveal your specific identity (like your name or contact information) but may
              include device and usage information, such as your IP address, browser and device characteristics,
              operating system, language preferences, referring URLs, device name, country, location, information about
              how and when you use our Services, and other technical information. This information is primarily needed
              to maintain the security and operation of our Services, and for our internal analytics and reporting
              purposes.
            </P>
            <P>Like many businesses, we also collect information through cookies and similar technologies.</P>
            <P>The information we collect includes:</P>
            <Bullets
              items={[
                <>
                  <strong>Location Data.</strong> We collect location data such as information about your
                  device&apos;s location, which can be either precise or imprecise. How much information we collect
                  depends on the type and settings of the device you use to access the Services. For example, we may
                  use GPS and other technologies to collect geolocation data that tells us your current location (based
                  on your IP address). You can opt out of allowing us to collect this information either by refusing
                  access to the information or by disabling your Location setting on your device. However, if you
                  choose to opt out, you may not be able to use certain aspects of the Services.
                </>,
              ]}
            />
          </Section>

          <Section id="infouse" title="2. HOW DO WE PROCESS YOUR INFORMATION?">
            <Short>
              We process your information to provide, improve, and administer our Services, communicate with you, for
              security and fraud prevention, and to comply with law. We may also process your information for other
              purposes with your consent.
            </Short>
            <P>
              We process your personal information for a variety of reasons, depending on how you interact with our
              Services, including:
            </P>
            <Bullets
              items={[
                <>
                  <strong>To facilitate account creation and authentication and otherwise manage user accounts.</strong>{' '}
                  We may process your information so you can create and log in to your account, as well as keep your
                  account in working order.
                </>,
                <>
                  <strong>To deliver and facilitate delivery of services to the user.</strong> We may process your
                  information to provide you with the requested service.
                </>,
                <>
                  <strong>To respond to user inquiries/offer support to users.</strong> We may process your information
                  to respond to your inquiries and solve any potential issues you might have with the requested
                  service.
                </>,
                <>
                  <strong>To send administrative information to you.</strong> We may process your information to send
                  you details about our products and services, changes to our terms and policies, and other similar
                  information.
                </>,
                <>
                  <strong>To fulfill and manage your orders.</strong> We may process your information to fulfill and
                  manage your orders, payments, returns, and exchanges made through the Services.
                </>,
                <>
                  <strong>To post testimonials.</strong> We post testimonials on our Services that may contain personal
                  information.
                </>,
                <>
                  <strong>To protect our Services.</strong> We may process your information as part of our efforts to
                  keep our Services safe and secure, including fraud monitoring and prevention.
                </>,
              ]}
            />
          </Section>

          <Section id="whoshare" title="3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?">
            <Short>
              We may share information in specific situations described in this section and/or with the following third
              parties.
            </Short>
            <P>We may need to share your personal information in the following situations:</P>
            <Bullets
              items={[
                <>
                  <strong>Business Transfers.</strong> We may share or transfer your information in connection with, or
                  during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a
                  portion of our business to another company.
                </>,
              ]}
            />
          </Section>

          <Section id="cookies" title="4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?">
            <Short>We may use cookies and other tracking technologies to collect and store your information.</Short>
            <P>
              We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information
              when you interact with our Services. Some online tracking technologies help us maintain the security of
              our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic
              site functions.
            </P>
            <P>
              We also permit third parties and service providers to use online tracking technologies on our Services
              for analytics and advertising, including to help manage and display advertisements or to tailor
              advertisements to your interests. The third parties and service providers use their technology to provide
              advertising about products and services tailored to your interests which may appear either on our
              Services or on other websites.
            </P>
            <P>
              Specific information about how we use such technologies and how you can refuse certain cookies is set out
              in our Cookie Notice.
            </P>
          </Section>

          <Section id="inforetain" title="5. HOW LONG DO WE KEEP YOUR INFORMATION?">
            <Short>
              We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice
              unless otherwise required by law.
            </Short>
            <P>
              We will only keep your personal information for as long as it is necessary for the purposes set out in
              this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax,
              accounting, or other legal requirements). No purpose in this notice will require us keeping your personal
              information for longer than the period of time in which users have an account with us.
            </P>
            <P>
              When we have no ongoing legitimate business need to process your personal information, we will either
              delete or anonymize such information, or, if this is not possible (for example, because your personal
              information has been stored in backup archives), then we will securely store your personal information and
              isolate it from any further processing until deletion is possible.
            </P>
          </Section>

          <Section id="infosafe" title="6. HOW DO WE KEEP YOUR INFORMATION SAFE?">
            <Short>
              We aim to protect your personal information through a system of organizational and technical security
              measures.
            </Short>
            <P>
              We have implemented appropriate and reasonable technical and organizational security measures designed to
              protect the security of any personal information we process. However, despite our safeguards and efforts
              to secure your information, no electronic transmission over the Internet or information storage
              technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers,
              cybercriminals, or other unauthorized third parties will not be able to defeat our security and
              improperly collect, access, steal, or modify your information. Although we will do our best to protect
              your personal information, transmission of personal information to and from our Services is at your own
              risk. You should only access the Services within a secure environment.
            </P>
          </Section>

          <Section id="infominors" title="7. DO WE COLLECT INFORMATION FROM MINORS?">
            <Short>We do not knowingly collect data from or market to children under 18 years of age.</Short>
            <P>
              We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we
              knowingly sell such personal information. By using the Services, you represent that you are at least 18
              or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the
              Services. If we learn that personal information from users less than 18 years of age has been collected,
              we will deactivate the account and take reasonable measures to promptly delete such data from our
              records. If you become aware of any data we may have collected from children under age 18, please contact
              us at {emailLink}.
            </P>
          </Section>

          <Section id="privacyrights" title="8. WHAT ARE YOUR PRIVACY RIGHTS?">
            <Short>
              You may review, change, or terminate your account at any time, depending on your country, province, or
              state of residence.
            </Short>
            <Box id="withdrawconsent">
              <P>
                <strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal
                information, which may be express and/or implied consent depending on the applicable law, you have the
                right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us
                by using the contact details provided in the section &quot;{contactLink}&quot; below.
              </P>
            </Box>
            <P>
              However, please note that this will not affect the lawfulness of the processing before its withdrawal
              nor, when applicable law allows, will it affect the processing of your personal information conducted in
              reliance on lawful processing grounds other than consent.
            </P>
            <P>
              <strong>Opting out of marketing and promotional communications:</strong> You can unsubscribe from our
              marketing and promotional communications at any time by clicking on the unsubscribe link in the emails
              that we send, replying &quot;STOP&quot; or &quot;UNSUBSCRIBE&quot; to the SMS messages that we send, or by
              contacting us using the details provided in the section &quot;{contactLink}&quot; below. You will then be
              removed from the marketing lists. However, we may still communicate with you — for example, to send you
              service-related messages that are necessary for the administration and use of your account, to respond to
              service requests, or for other non-marketing purposes.
            </P>

            <SubHeading>Account Information</SubHeading>
            <P>
              If you would at any time like to review or change the information in your account or terminate your
              account, you can:
            </P>
            <Bullets
              items={[
                'Log in to your account settings and update your user account.',
                'Contact us using the contact information provided.',
              ]}
            />
            <P>
              Upon your request to terminate your account, we will deactivate or delete your account and information
              from our active databases. However, we may retain some information in our files to prevent fraud,
              troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with
              applicable legal requirements.
            </P>
            <P>
              <strong>Cookies and similar technologies:</strong> Most Web browsers are set to accept cookies by
              default. If you prefer, you can usually choose to set your browser to remove cookies and to reject
              cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services
              of our Services.
            </P>
            <P>
              If you have questions or comments about your privacy rights, you may email us at {emailLink}.
            </P>
          </Section>

          <Section id="DNT" title="9. CONTROLS FOR DO-NOT-TRACK FEATURES">
            <P>
              Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track
              (&quot;DNT&quot;) feature or setting you can activate to signal your privacy preference not to have data
              about your online browsing activities monitored and collected. At this stage, no uniform technology
              standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently
              respond to DNT browser signals or any other mechanism that automatically communicates your choice not to
              be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will
              inform you about that practice in a revised version of this Privacy Notice.
            </P>
          </Section>

          <Section id="policyupdates" title="10. DO WE MAKE UPDATES TO THIS NOTICE?">
            <Short>Yes, we will update this notice as necessary to stay compliant with relevant laws.</Short>
            <P>
              We may update this Privacy Notice from time to time. The updated version will be indicated by an updated
              &quot;Revised&quot; date at the top of this Privacy Notice. If we make material changes to this Privacy
              Notice, we may notify you either by prominently posting a notice of such changes or by directly sending
              you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are
              protecting your information.
            </P>
          </Section>

          <Section id="contact" title="11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?">
            <P>
              If you have questions or comments about this notice, you may email us at {emailLink} or contact us by
              post at:
            </P>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Doctor Doorstep
              <br />
              Shop No.3, Sai Sarovar, C-wing, S.V. Road
              <br />
              R.N.P., RNP Park, Jesal Park
              <br />
              Bhayandar East, Mumbai, Maharashtra 401105
              <br />
              India
            </Typography>
          </Section>

          <Section id="request" title="12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?">
            <P>
              You have the right to request access to the personal information we collect from you, details about how
              we have processed it, correct inaccuracies, or delete your personal information. You may also have the
              right to withdraw your consent to our processing of your personal information. These rights may be limited
              in some circumstances by applicable law. To request to review, update, or delete your personal
              information, please visit:{' '}
              <Link href="https://doctordoorstep.com/" underline="hover">
                https://doctordoorstep.com/
              </Link>
              .
            </P>
          </Section>

          <Typography variant="body2" color="text.secondary">
            This Privacy Policy was created using Termly&apos;s{' '}
            <Link
              href="https://termly.io/products/privacy-policy-generator/"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
            >
              Privacy Policy Generator
            </Link>
          </Typography>
        </Container>
      </Box>
    </>
  );
}
