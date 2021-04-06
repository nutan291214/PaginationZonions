package com.example.demo.config;


import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.ERole;
import com.example.demo.entity.RegistrationEntity;
import com.example.demo.entity.RegistrationEntityDto;
import com.example.demo.entity.Role;
import com.example.demo.repository.RegistrationDtoRepository;
import com.example.demo.repository.RegistrationRepository;
import com.example.demo.repository.RoleRepository;

@Component
public class ZonionsStartup implements ApplicationListener<ContextRefreshedEvent> {
  private static boolean alreadySetup = false;

  @Autowired
  RegistrationRepository registrationRepository;


  @Autowired
  RegistrationDtoRepository registrationRepositorydto;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;


  @Override
  public void onApplicationEvent(final ContextRefreshedEvent event) {
    if (alreadySetup) {
      return;
    }

    Role adminrole = createRoleIfNotFound(ERole.ROLE_ADMIN);
    Role userrole = createRoleIfNotFound(ERole.ROLE_USER);
    createUserIfNotFound("admin", "admin@foo.com", Set.of(adminrole));
    createUserDtoIfNotFound("admin", "admin@foo.com", Set.of(adminrole));
    alreadySetup = true;

  }

  @Transactional
  private final RegistrationEntity createUserIfNotFound(final String username, String email,
      Set<Role> roles) {
    RegistrationEntity user = registrationRepository.findByUsername(username);
    if (user == null) {
      System.out.println("*******************");
      user = new RegistrationEntity();
      user.setUsername(username);
      user.setEmail(email);
      user.setPassword(passwordEncoder.encode("admin@123"));
      user.setRoles(roles);
      user = registrationRepository.save(user);
    }
    return user;
  }

  @Transactional
  private final RegistrationEntityDto createUserDtoIfNotFound(final String username, String email,
      Set<Role> roles) {
    RegistrationEntityDto user = registrationRepositorydto.findByUsername(username);
    if (user == null) {
      System.out.println("*******************");
      user = new RegistrationEntityDto();
      user.setUsername(username);
      user.setEmail(email);
      user.setRoles(roles);
      user = registrationRepositorydto.save(user);
    }
    return user;
  }

  @Transactional
  private final Role createRoleIfNotFound(final ERole name) {
    Role role = roleRepository.findByName(name);
    if (role == null) {
      // role.setName(name);
      role = roleRepository.save(new Role(name));
    }

    return role;
  }
}
