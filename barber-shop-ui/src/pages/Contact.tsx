import Contact from "../components/contact/Contact";
import PageContent from "../components/PageContent";

const ContactPage = () => {
    return (
        <PageContent className="flex flex-col items-center justify-center mx-auto px-6 py-24 w-12/12 lg:w-8/12 bg-yellow-100 bg-opacity-50">
            <Contact />
        </PageContent>
    );
}

export default ContactPage;