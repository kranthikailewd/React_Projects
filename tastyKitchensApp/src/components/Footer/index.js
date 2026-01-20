import {Link} from 'react-router-dom'
import {SiLinkedin, SiGithub} from 'react-icons/si'

import './index.css'

const footerSocialIcons = [
  {
    id: 1,
    icon: <SiLinkedin />,
    socialLink: 'https://www.linkedin.com/in/kranthi-kaile',
  },
  {
    id: 2,
    icon: <SiGithub />,
    socialLink: 'https://github.com/kranthikailewd/React_Projects',
  },
]

const Footer = () => (
  <div className="footer_container">
    <div className="footer_logo_group">
      <Link to="/" className="header_logo_block">
        <img
          className="mobile_website_logo"
          src="https://res.cloudinary.com/pavankalyanbandaru/image/upload/v1651083036/tasty-kitchens/footer-website-logo.png"
          alt="website-footer-logo"
        />
        <p className="footer_website_name">Tasty Kitchens</p>
      </Link>
    </div>
    <p className="footer_para">
      The only thing we are serious about is food.
      <br />
      Contact us on
    </p>
    <ul className="footer_social_icons_list">
      {footerSocialIcons.map(each => (
        <li className="footer_social_icons_list_item" key={each.id}>
          <a className="footer_social_icon_link" href={each.socialLink}>
            <p className="footer_social_icon">{each.icon}</p>
          </a>
        </li>
      ))}
    </ul>
  </div>
)

export default Footer
