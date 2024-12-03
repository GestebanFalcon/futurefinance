export const VerifyEmailTemplate = ({ link }: { link: string }) => {
    return (
        <p>Verify your email <a href={link}>Here</a><br />Or copy and paste the following link into your browser: {link}</p>
    )
}