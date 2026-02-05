package cdb.swagger.gen_swagger.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cdb.swagger.gen_swagger.models.MyData;
import lombok.extern.slf4j.Slf4j;

/**
 * This class
 *
 * @author davidbarrineau - david.barrineau@phxlogistics.com
 * @since Feb 3, 2026 2:42:54 PM
 */
@Slf4j
@RestController
@RequestMapping("/my-swagger")
public class GenSwaggerController {

  private MyData myData = new MyData(10, "Ten");
  
  @GetMapping("data")
  public MyData getMyData() {
    return myData;
  }
  
  @PostMapping("data")
  public void updateMyData(@RequestBody MyData data) {
    log.info("Update Data: {}", data);
    myData = data;
  }
  
  @PutMapping("data")
  public void createMyData(@RequestBody MyData data) {
    log.info("Create Data: {}", data);
    myData = data;
  }
  
  @DeleteMapping("data/{id}")
  public void deleteMyData(@PathVariable int id) {
    log.info("Deleting data {}", id);
  }
}
