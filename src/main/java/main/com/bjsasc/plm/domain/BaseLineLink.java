package main.com.bjsasc.plm.domain;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * 
 * @TableName baselinelink
 */
@TableName(value ="baselinelink")
@Data
public class BaseLineLink implements Serializable {
    /**
     * 
     */
    @TableId
    private String id;

    /**
     * 
     */
    private String baselineid;

    /**
     * 
     */
    private String documentverno;

    /**
     * 
     */
    private String docid;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        BaseLineLink other = (BaseLineLink) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getBaselineid() == null ? other.getBaselineid() == null : this.getBaselineid().equals(other.getBaselineid()))
            && (this.getDocumentverno() == null ? other.getDocumentverno() == null : this.getDocumentverno().equals(other.getDocumentverno()))
            && (this.getDocid() == null ? other.getDocid() == null : this.getDocid().equals(other.getDocid()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getBaselineid() == null) ? 0 : getBaselineid().hashCode());
        result = prime * result + ((getDocumentverno() == null) ? 0 : getDocumentverno().hashCode());
        result = prime * result + ((getDocid() == null) ? 0 : getDocid().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", baselineid=").append(baselineid);
        sb.append(", documentverno=").append(documentverno);
        sb.append(", docid=").append(docid);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}