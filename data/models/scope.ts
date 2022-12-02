import { aggregations } from './../aggregations/index';
export class Scope {
  public list: string[];
  public isOpenIDConnect: boolean;
  public baseAggregation: any[];
  constructor(uid: string, scopeStr: string) {
    this.list = scopeStr.split(" ")
    this.isOpenIDConnect = this.list.includes("openid")
    this.baseAggregation = this.calculateBaseAggregation(uid);
    this.getAggregations()
  }

  private getAggregations() {
    for (let i=0;i< this.list.length; i++) {
      let a = this.handleEachScope(this.list[i])
      if (a !== null) {
        this.baseAggregation = [...this.baseAggregation, ...a]
      }
    }
  }

  private calculateBaseAggregation(uid: string): any[] {
    const requires: string[] = []
    
    for (const e of this.list) {
      switch (e) {
        case "university_email": {
          requires.push("universityEmail")
          break;
        }
        case "personal_email": {
          requires.push("personalEmail")
          break;
        }
        case "profile_pic": {
          requires.push("profileImageUrl")
          break;
        }
      }
      
    }
    const userBaseAggr = aggregations.public.userWith(uid, requires)
    return userBaseAggr;
  }

  private handleEachScope(scope: string): any[] | null {
    switch (scope) {
      case "student": {
        return aggregations.public.student()
      }
      case "educations": {
        return aggregations.public.education()
      }
      default: {
        return null
      }
    }
  }

}