package unq.ar.edu.dessap.grupol.controller.dtos;

public class JwtResponse {

    private long id;
    private String email;
    private String username;
    private String token;

    public JwtResponse(long id, String email, String username, String token) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.token = token;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
