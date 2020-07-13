package unq.ar.edu.dessap.test.architecture;


import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.lang.ArchRule;
import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

@AnalyzeClasses(packages = "unq.ar.edu.desapp.grupol")
public class MyArchitectureTest {

//    @ArchTest
//    static final ArchRule services_should_not_access_controllers =
//            noClasses().that().resideInAPackage("..service..")
//                    .should().accessClassesThat().resideInAPackage("..controllerjhghhj..");

}
