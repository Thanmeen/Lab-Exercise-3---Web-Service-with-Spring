package th.ac.mahidol.ict.heroesbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import th.ac.mahidol.ict.heroesbackend.model.*;
import th.ac.mahidol.ict.heroesbackend.repository.SuperhumanRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class SuperhumanController {

    @Autowired
    private SuperhumanRepository superhumanRepository;

    @CrossOrigin
    @GetMapping("/")
    public @ResponseBody String welcome() {
        // show the welcome page at the root
        return "Hello, welcome to the Heroes application";
    }

    @CrossOrigin
    @PostMapping("/heroes")
    public @ResponseBody String addHero(@RequestBody Map<String, Object> body) {
        System.out.println(body);

        String type = body.get("type") != null ? body.get("type").toString() : null;
        if (type == null) {
            return "Error: Type is required.";
        }

        if (type.equals("hero")) {
            Hero h = createNewHeroWithId(Integer.parseInt(body.get("id").toString()), body);
            superhumanRepository.save(h);
            return "Saved: " + h;
        } else if (type.equals("villain")) {
            Villain v = createNewVillainWithId(Integer.parseInt(body.get("id").toString()), body);
            superhumanRepository.save(v);
            return "Saved: " + v;
        }

        return "Error: wrong superhuman type";
    }

    private Hero createNewHeroWithId(int id, Map<String, Object> body) {
        // create a new hero with the given info
        Hero h = new Hero();
        h.setId(id);
        return setHeroInfo(h, body);
    }

    private Villain createNewVillainWithId(int id, Map<String, Object> body) {
        // create a new villain with the given info
        Villain v = new Villain();
        v.setId(id);
        return setVillainInfo(v, body);
    }

    private Hero setHeroInfo(Hero h, Map<String, Object> body) {
        h.setName(body.get("name").toString());
        h.setType(body.get("type").toString());
        h.setRealname(body.get("realname").toString());
        h.setSuperpower(body.get("superpower").toString());
        h.setImageURL(body.get("imageURL").toString());

        if (body.get("weapons") != null) {
            h.setWeapons(createWeaponList((ArrayList<Map<String, Object>>) body.get("weapons"), h));
        }

        if (body.get("humanFriends") != null) {
            h.setHumanFriends(createFriendList((ArrayList<Map<String, Object>>) body.get("humanFriends"), h));
        }

        return h;
    }

    private Villain setVillainInfo(Villain v, Map<String, Object> body) {
        v.setName(body.get("name").toString());
        v.setType(body.get("type").toString());
        v.setOrigin(body.get("origin").toString());
        v.setSuperpower(body.get("superpower").toString());
        v.setImageURL(body.get("imageURL").toString());

        if (body.get("weapons") != null) {
            v.setWeapons(createWeaponList((ArrayList<Map<String, Object>>) body.get("weapons"), v));
        }

        if (body.get("humanFriends") != null) {
            v.setHumanFriends(createFriendList((ArrayList<Map<String, Object>>) body.get("humanFriends"), v));
        }

        return v;
    }

    private List<Weapon> createWeaponList(ArrayList<Map<String, Object>> weapons, Superhuman h) {
        List<Weapon> weaponList = new ArrayList<>();
        for (Map<String, Object> o : weapons) {
            System.out.println(o);
            Weapon w = new Weapon(o.get("name").toString(), o.get("description").toString(), h);
            weaponList.add(w);
        }
        return weaponList;
    }

    private List<Human> createFriendList(ArrayList<Map<String, Object>> friends, Superhuman h) {
        List<Human> friendList = new ArrayList<>();
        for (Map<String, Object> o : friends) {
            System.out.println(o);
            Human friend = new Human(o.get("name").toString());
            friend.addFriend(h);
            friendList.add(friend);
        }
        return friendList;
    }

    @CrossOrigin
    @GetMapping("/heroes")

    public @ResponseBody Iterable<Superhuman> getAllHeroes() {
        // This returns list of JSON objects of all the heroes
        return superhumanRepository.findAll();
    }


    @CrossOrigin
    @GetMapping("/heroes/{id}")
    public @ResponseBody Superhuman getHeroById(@PathVariable int id) {
        return superhumanRepository.findById(id).orElse(null);

    }

    @CrossOrigin
    @PutMapping("/heroes/{id}")
    public @ResponseBody String updateHeroById(@PathVariable int id, @RequestBody Map<String, Object> body) {
        Superhuman existingHero = superhumanRepository.findById(id).orElse(null);
        if (existingHero != null) {
            existingHero = setHeroInfo((Hero) existingHero, body);
            superhumanRepository.save(existingHero);
            return "Updated: " + existingHero;
        }
        return "Hero not found";
    }

    @CrossOrigin
    @DeleteMapping("/heroes/{id}")
    public @ResponseBody String deleteHeroById(@PathVariable int id) {
        Superhuman existingHero = superhumanRepository.findById(id).orElse(null);
        if (existingHero != null) {
            superhumanRepository.delete(existingHero);  // Delete Hero
            return "Deleted: " + existingHero;
        }
        return "Hero not found";  // If Hero doesn't exist
    }

    @CrossOrigin
    @DeleteMapping("/heroes")
    public @ResponseBody String deleteAllHeroes() {
        superhumanRepository.deleteAll();  // Delete all heroes from the repository
        return "All heroes deleted";
    }

}
