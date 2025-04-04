package th.ac.mahidol.ict.heroesbackend.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Human {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;
    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "SUPERHUMAN_HUMAN",
            joinColumns = {@JoinColumn(name = "superhero_id")},
            inverseJoinColumns = {@JoinColumn(name = "human_id")}
    )

    @JsonIgnore
    private List<Superhuman> superhumanFriends;

    public Human() {
        super();
    }

    public Human(String name) {
        this.name = name;
        this.superhumanFriends = new ArrayList<>();
    }

    public void addFriend(Superhuman friend) {
        this.superhumanFriends.add(friend);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Superhuman> getSuperhumanFriends() {
        return superhumanFriends;
    }

    public void setSuperhumanFriends(ArrayList<Superhuman> superhumanFriends) {
        this.superhumanFriends = superhumanFriends;
    }

    @Override
    public String toString() {
        return "Human{" + "name='" + name + '\'' + '}';
    }
}

