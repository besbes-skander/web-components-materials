import { Footer } from "./footer";

it('should return footer when user is connected', () => {
    const footer = new Footer();
    footer.setAttribute('is-user-connected', "true")
    expect(footer.shadowRoot?.querySelector('#footer')).toMatchSnapshot()
});

it('should return footer when user is NOT connected', async () => {
    const footer = new Footer();
    footer.setAttribute('is-user-connected', "false")
    expect(footer?.shadowRoot?.querySelector('#footer')).toMatchSnapshot()
});