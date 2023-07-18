package main.com.bjsasc.plm;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.env.Environment;

//import com.bjsasc.plm.foundation.util.PluginUtils;


/**
 * 启动程序
 *
 * @author ASP团队
 */
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@ComponentScan({"com.bjsasc", "com.bjsasc.plm.**"})
@MapperScan({"com.bjsasc.plm.*.mapper","com.bjsasc.plm.mapper","com.bjsasc.adp.*.mapper,com.bjsasc.platform.mapper,com.bjsasc.ems.platform.version.mapper"})
@EnableDiscoveryClient
@EnableFeignClients
public class SxPdmApplication {
    public static void main(String[] args) {

        System.setProperty("es.set.netty.runtime.available.processors", "false");
        System.setProperty("spring.devtools.restart.enabled", "false");
        
        ConfigurableApplicationContext context=SpringApplication.run(SxPdmApplication.class, args);
        System.out.println("=====================AVIDM-PDM启动成功========================");

        Environment environment = context.getEnvironment();
        String pprofiles=environment.getActiveProfiles()[0];
        String port=environment.getProperty("server.port");
        String serverName=environment.getProperty("spring.application.name");
        String frontpath=environment.getProperty("drap_platform.sso_server.frontpath");
        String login_target=environment.getProperty("drap_platform.sso_server.login_target");
        System.out.println("   运行环境："+pprofiles);
        System.out.println("   后端服务端口："+port);
        System.out.println("   后端服务名："+serverName);
        System.out.println("   前端地址："+frontpath);
        System.out.println("   后端地址："+login_target);

        System.setProperty("dev.server.name", serverName);
    }
}
