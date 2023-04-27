import React from 'react';
import {
  Box,
  Form,
  Heading,
  Button,
  Anchor,
  Image,
  Text,
} from '../../components/elements';
import IconField from '../../components/fields/IconField';
import Logo from '../../components/Logo';
import data from '../../data/master/login.json';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import useAuthStore from '../../store/authStore';

const inputName = ['email', 'password'];
const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => useAuthStore.login(data, navigate);

  return (
    <Box className="mc-auth">
      <Image
        src={data?.pattern.src}
        alt={data?.pattern.alt}
        className="mc-auth-pattern"
      />
      <Box className="mc-auth-group">
        <Logo
          src={data?.logo.src}
          alt={data?.logo.alt}
          href={data?.logo.path}
          className="mc-auth-logo"
        />
        <Heading as="h4" className="mc-auth-title">
          {data?.title}
        </Heading>
        <form className="mc-auth-form" onSubmit={handleSubmit(onSubmit)}>
          {data?.input.map((item, index) => (
            <IconField
              key={index}
              icon={item.icon}
              type={item.type}
              option={item.option}
              classes={item.fieldSize}
              nameInput={inputName[index]}
              register={register}
              placeholder={item.placeholder}
              passwordVisible={item.passwordVisible}
            />
          ))}
          <Button
            className={`mc-auth-btn ${data?.button.fieldSize}`}
            type="submit"
          >
            {data?.button.text}
          </Button>
          <Anchor className="mc-auth-forgot" href={data?.forgot.path}>
            {data?.forgot.text}
          </Anchor>
          <Box className="mc-auth-divide">
            <Text as="span">{data?.divide.text}</Text>
          </Box>
          <Box className="mc-auth-connect">
            {data?.connect.map((item, index) => (
              <Anchor key={index} href={item.path} className={item.classes}>
                <i className={item.icon}></i>
                <span>{item.text}</span>
              </Anchor>
            ))}
          </Box>
        </form>
        <Box className="mc-auth-navigate">
          <Text as="span">{data?.navigate.title}</Text>
          <Anchor href={data?.navigate.path}>{data?.navigate.text}</Anchor>
        </Box>
      </Box>
    </Box>
  );
};

export default observer(Login);
