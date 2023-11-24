import Head from 'next/head';

interface IProps {
    title: string;
    description: string;
    ogImage?: string;
    ogUrl?: string;
    twitterImage?: string;
}

const SEO: React.FC<IProps> = ({ title, description, ogImage, ogUrl, twitterImage }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            {/* Open Graph tags */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:type" content="website" />
            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={twitterImage} />
            {/* Add other SEO-related meta tags here */}
        </Head>
    );
};
export default SEO;