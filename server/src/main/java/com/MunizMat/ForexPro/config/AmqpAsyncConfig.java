package com.MunizMat.ForexPro.config;

import org.springframework.amqp.rabbit.AsyncRabbitTemplate;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.connection.SimpleRoutingConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.amqp.outbound.AsyncAmqpOutboundGateway;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.messaging.MessageChannel;

@Configuration
public class AmqpAsyncConfig {
    public static final String CHANNEL_NAME = "amqpOutboundChannel";


    @Bean
    public SimpleMessageListenerContainer replyContainer() {
        ConnectionFactory connectionFactory = new SimpleRoutingConnectionFactory();
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer(connectionFactory);
        container.setQueueNames("trades");
        return container;
    }

    @Bean
    public AsyncRabbitTemplate asyncTemplate(RabbitTemplate rabbitTemplate,
                                             SimpleMessageListenerContainer replyContainer) {

        return new AsyncRabbitTemplate(rabbitTemplate, replyContainer);
    }

    @Bean
    @ServiceActivator(inputChannel = CHANNEL_NAME)
    public AsyncAmqpOutboundGateway amqpOutbound(AsyncRabbitTemplate asyncTemplate) {
        AsyncAmqpOutboundGateway outbound = new AsyncAmqpOutboundGateway(asyncTemplate);
        outbound.setRoutingKey("trades");
        return outbound;
    }


    @Bean
    public MessageChannel amqpOutboundChannel() {
        return new DirectChannel();
    }

}