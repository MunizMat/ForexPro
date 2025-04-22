package com.MunizMat.ForexPro.services.impl;

import com.MunizMat.ForexPro.authentication.CustomUserDetails;
import com.MunizMat.ForexPro.entities.User;
import com.MunizMat.ForexPro.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        User user = userRepository.findById(Long.parseLong(userId))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new CustomUserDetails(String.valueOf(user.getId()));
    }
}
