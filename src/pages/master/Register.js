import React from 'react';
import {
  Box,
  Text,
  Form,
  Image,
  Button,
  Anchor,
  Heading,
  Input,
  Label,
  Icon,
} from '../../components/elements';
import IconField from '../../components/fields/IconField';
import Logo from '../../components/Logo';
import data from '../../data/master/register.json';
import { observer } from 'mobx-react';
import useAuthStore from '../../store/authStore';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const nameInput = ['name', 'email', 'password', 'c_password'];

const Register = () => {
  const { register, handleSubmit } = useForm();
  //   history.push('/login');
  const navigate = useNavigate();

  const onSubmit = (data) => useAuthStore.register(data, navigate);
  return (
    <Box className="mc-register">
      <Box className="mc-register-banner">
        <Image
          className="mc-register-banner-pattern"
          src={data?.pattern.src}
          alt={data?.pattern.alt}
        />
        <Box className="mc-register-banner-content">
          <Heading as="h2" className="mc-register-banner-title">
            {data?.title.banner}
          </Heading>
          <Text as="p" className="mc-register-banner-descrip">
            {data?.descrip}
          </Text>
          <Anchor
            icon={data?.anchor.icon}
            text={data?.anchor.text}
            href={data?.anchor.path}
            className="mc-btn primary"
          />
        </Box>
      </Box>
      <div className="mc-register-form">
        <Logo
          src={data?.logo.src}
          alt={data?.logo.alt}
          href={data?.logo.path}
          className="mc-auth-logo"
        />
        <Heading as="h4" className="mc-auth-title">
          {data?.title.from}
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          {data?.input.map((item, index) => (
            <IconField
              key={index}
              icon={item.icon}
              type={item.type}
              classes={item.fieldSize}
              placeholder={item.placeholder}
              register={register}
              nameInput={nameInput[index]}
              passwordVisible={item.passwordVisible}
            />
          ))}

          <Box className="mc-auth-checkbox">
            <Input type="checkbox" id="checkbox" />
            <Label text={data?.checkLabel} htmlFor="checkbox" />
          </Box>
          <button type="submit">Subbmit</button>
          <Button
            className={`mc-auth-btn ${data?.button.fieldSize}`}
            type="submit"
          >
            {data?.button.text}
          </Button>
        </form>

        <Box className="mc-auth-divide">
          <Text as="span">{data?.divide.text}</Text>
        </Box>
        <Box className="mc-auth-connect">
          {data?.connect.map((item, index) => (
            <Anchor key={index} href={item.path} className={item.classes}>
              <Icon className={item.icon}></Icon>
              <Text as="span">{item.text}</Text>
            </Anchor>
          ))}
        </Box>
        <Box className="mc-register-navigate">
          <Text as="span">{data?.navigate.title}</Text>
          <Anchor href={data?.navigate.path}>{data?.navigate.text}</Anchor>
        </Box>
      </div>
    </Box>
  );
};
export default observer(Register);
