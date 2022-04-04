import {useMatch} from 'react-router-dom'
import {Link,LinkProps} from 'react-router-dom'

type ActivableLinkProps = LinkProps & { type?: 'link' | 'button' };

export const ActivableLink: React.FC<ActivableLinkProps> = (props) => {
  const { type } = props;
  const match = useMatch(props.to.toString());
  const underlineClass = "border-[#44c2fd] border-b-2";
  const baseClass = "text-lg uppercase cursor-pointer hover:border-[#44c2fd] hover:border-b-2 ";
  const isButton = type === 'button';

  return (
    <Link
      className={ match && !isButton && (props.children!=='Logout') ? `${baseClass} ${underlineClass}` : `${baseClass}` }
      {...props}
    />
  );
};