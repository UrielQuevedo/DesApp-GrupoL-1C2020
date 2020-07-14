package unq.ar.edu.dessap.test.architecture;

import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.lang.ArchRule;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.classes;

@AnalyzeClasses(packages = "unq.ar.edu.desapp.grupol")
public class MyArchitectureTest {

    @ArchTest
    static final ArchRule Controllers_must_reside_in_a_controller_package =
            classes().that().haveNameMatching(".*Controller").should().resideInAPackage("..controller..")
                    .as("Controllers should reside in a package '..controller..'");

    @ArchTest
    static final ArchRule Services_must_reside_in_a_service_package =
            classes().that().haveNameMatching(".*Service").should().resideInAPackage("..service..")
                    .as("Services should reside in a package '..service..'");

    @ArchTest
    static final ArchRule DAOs_must_reside_in_a_persistence_package =
            classes().that().haveNameMatching(".*Dao").should().resideInAPackage("..persistence..")
                    .as("Daos should reside in a package '..persistence..'");

}