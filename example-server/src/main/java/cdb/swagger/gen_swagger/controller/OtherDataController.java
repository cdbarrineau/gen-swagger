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
import cdb.swagger.gen_swagger.models.SomeOtherData;
import lombok.extern.slf4j.Slf4j;

/**
 * This class
 *
 * @author davidbarrineau
 * @since Feb 3, 2026 2:42:54 PM
 */
@Slf4j
@RestController
@RequestMapping("/other-data")
public class OtherDataController {

  private SomeOtherData otherData = new SomeOtherData(10, new MyData(20, "Twenty"));
  
  @GetMapping("data")
  public SomeOtherData getMyData() {
    return otherData;
  }
  
  @PostMapping("data")
  public void updateMyData(@RequestBody SomeOtherData data) {
    log.info("Update Data: {}", data);
    otherData = data;
  }
  
  @PutMapping("data")
  public void createMyData(@RequestBody SomeOtherData data) {
    log.info("Create Data: {}", data);
    otherData = data;
  }
  
  @DeleteMapping("data/{id}")
  public void deleteMyData(@PathVariable int id) {
    log.info("Deleting data {}", id);
  }
}
