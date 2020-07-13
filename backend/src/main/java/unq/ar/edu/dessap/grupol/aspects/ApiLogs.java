package unq.ar.edu.dessap.grupol.aspects;

import org.apache.log4j.LogManager;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
@Aspect
public class ApiLogs {

    @Pointcut("@within(org.springframework.web.bind.annotation.RestController)")
    public void allResources() {
    }

    @Before("allResources()")
    public void apiRequestLog(JoinPoint jp) {
        LogManager.getLogger(jp.getSignature().getDeclaringTypeName()).info("------------------------- o -------------------------");
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        String log = "Metodo: " + jp.getSignature().getName();
        for (Object arg : jp.getArgs()) {
            log += "\n   ARG: " + arg;
        }
        LogManager.getLogger(jp.getSignature().getDeclaringTypeName()).info("Fecha: " + timestamp);
        LogManager.getLogger(jp.getSignature().getDeclaringTypeName()).info(log);
    }
    
    // reporta el error en caso de que exista
    @AfterThrowing(pointcut = "allResources()", throwing = "exception")
    public void apiResponseExceptionLog(JoinPoint jp, Exception exception) {
        String log = "<<< Return --EXCEPTION-- << " + jp.getSignature().getName() + ": " + exception.getClass().getSimpleName();
        LogManager.getLogger(jp.getSignature().getDeclaringTypeName()).info(log);
    }

}