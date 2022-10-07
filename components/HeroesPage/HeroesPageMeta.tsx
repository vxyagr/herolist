import type { FunctionComponent } from "react";

/**
 * HomePageMetaProps is a React Component properties that passed to React Component HomePageMeta
 */
type HomePageMetaProps = {};

/**
 * HomePageMeta is just yet another react component
 *
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */

const HomePageMeta: FunctionComponent<HomePageMetaProps> = ({}) => {
    return (
        <>
            {/* <!-- Facebook Meta Tags --> */}
            <meta property="og:url" content="https://stonker.club/" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Hiroes - Heroes for Hire" />
            <meta property="og:description" content="Get a hero tp safe your day!" />
            <meta property="og:image" content="" />

            {/* <!-- Twitter Meta Tags --> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="" />
            <meta property="twitter:url" content="" />
            <meta name="twitter:title" content="Hiroes - Heroes for Hire" />
            <meta name="twitter:description" content="Get a hero tp safe your day!" />
            <meta name="twitter:image" content="" />
        </>
    );
};

export default HomePageMeta;
