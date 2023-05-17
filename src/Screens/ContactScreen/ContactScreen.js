/** @jsxImportSource @emotion/react */

import ContactForm from '../../Components/Forms/ContactForm/ContactForm';

import { sectionStyles } from './ContactScreen.styles';

const ContactScreen = () => {
  return (
    <>
      <section css={sectionStyles}>
        <ContactForm />
      </section>
    </>
  );
};

export default ContactScreen;
